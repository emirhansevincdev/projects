<?php

namespace App\Console\Commands;

use App\Models\Kv\Message;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

/**
 * Message attachments live on the private disk under kv/messages/<conversation id>/. When a company is deleted its conversations
 * (and messages) disappear through the database cascade, but the files stay behind – this removes every file no message points at.
 * Schedule it daily: Schedule::command('kv:prune-message-files')->daily();
 */
class PruneMessageFiles extends Command
{
    protected $signature = 'kv:prune-message-files {--dry-run : only list what would be removed} {--min-age=24 : leave files younger than this many hours alone (a send may be in flight)}';
    protected $description = 'Delete private message attachments that no message refers to any more';

    public function handle(): int
    {
        $disk = Storage::disk('local');
        $cut = now()->subHours(max(0, (int) $this->option('min-age')))->timestamp;
        $dry = (bool) $this->option('dry-run');
        $removed = 0;
        foreach ($disk->allFiles('kv/messages') as $file) {
            if ($disk->lastModified($file) > $cut) {
                continue;
            }
            if (Message::where('attachment_path', $file)->exists()) {
                continue;
            }
            $this->line(($dry ? 'would remove ' : 'removed ').$file);
            if (! $dry) {
                $disk->delete($file);
            }
            $removed++;
        }
        if (! $dry) {
            foreach ($disk->directories('kv/messages') as $dir) {       // drop folders that are empty now
                if (! $disk->allFiles($dir)) {
                    $disk->deleteDirectory($dir);
                }
            }
        }
        $this->info(($dry ? 'Would remove ' : 'Removed ').$removed.' orphaned attachment file(s).');
        return self::SUCCESS;
    }
}
