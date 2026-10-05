<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Pagination\Paginator;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Paginator::useBootstrap();

        // Reset / first-time password links open the Kervea page, not the legacy template view.
        \Illuminate\Auth\Notifications\ResetPassword::createUrlUsing(function ($user, string $token) {
            return url('/set-password?token='.$token.'&email='.urlencode($user->getEmailForPasswordReset()));
        });
    }
}
