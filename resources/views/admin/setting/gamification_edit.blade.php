
                    <form action="{{route('admin.gamification_badge.update', $badge->id)}}" method="post" enctype="multipart/form-data">
                        @csrf
                        
                        <div class="mb-3">
                            <label class="form-label ol-form-label">{{ get_phrase('Badge title') }}<span class="text-danger ms-1">*</span></label>
                            <input type="text" name="title" value="{{ $badge->title }}" class="form-control ol-form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label ol-form-label">{{ get_phrase('Badge Field') }}<span class="text-danger ms-1">*</span></label>
                            <select name="field" class="form-control ol-select2 ol-modal-select2 ol-form-control" data-minimum-results-for-search="Infinity">
                                <option>{{ get_phrase('Select Field') }}</option>
                                <option @if ($badge->field == 'number_of_review') selected @endif value="number_of_review">Number of Review</option>
                                <option @if ($badge->field == 'number_of_5_star_review') selected @endif value="number_of_5_star_review">Number of 5 star Review</option>
                                <option @if ($badge->field == 'number_of_listing') selected @endif value="number_of_listing">Number of Listing</option>
                                <option @if ($badge->field == 'number_of_article') selected @endif value="number_of_article">Number of Article</option>
                            </select>
                        </div>
                        <div class="mb-3 row g-3">
                            <div class="col-sm-6">
                                <label class="form-label ol-form-label">{{ get_phrase('Value From') }}<span class="text-danger ms-1">*</span></label>
                                <input type="number" step="0.1" value="{{ $badge->value_from }}" name="value_from" class="form-control ol-form-control">
                            </div>
                            <div class="col-sm-6">
                                <label class="form-label ol-form-label">{{ get_phrase('Value To') }}<span class="text-danger ms-1">*</span></label>
                                <input type="number" step="0.1" value="{{ $badge->value_to }}" name="value_to" class="form-control ol-form-control">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label ol-form-label">{{ get_phrase('Badge Description') }}</label>
                            <textarea name="description" class="form-control ol-form-control">{{ $badge->description }}</textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label ol-form-label">{{ get_phrase('Badge Icon') }}</label>
                            <input type="file" name="icon" class="form-control form-control-file" accept="image/*">
                        </div>
                        <div class="fpb-7 mb-3">
                            <button type="submit" class="ol-btn-primary">{{ get_phrase('Update Badge') }}</button>
                        </div>
                    </form>
               
                        <script>
                            if ($('.ol-modal-select2').length) {
                                $('.ol-modal-select2').each(function () {
                                    // select2 destroy
                                    if ($(this).hasClass('select2-hidden-accessible')) {
                                        $(this).select2('destroy');
                                    }
                                    // fresh initialize
                                    $(this).select2({
                                        dropdownParent: $('#edit-modal')
                                    });
                                    // custom class
                                    $(this).data('select2').$dropdown.addClass('select-drop');
                                });
                            }
                        </script>
