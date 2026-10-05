    <form action="{{ route('admin.gamification_badge.store') }}" method="post" enctype="multipart/form-data">
        @csrf
        
        <div class="mb-3">
            <label class="form-label ol-form-label">{{ get_phrase('Title') }}<span class="text-danger ms-1">*</span></label>
            <input type="text" name="title" class="form-control ol-form-control" placeholder="Badge Title">
        </div>
        <div class="mb-3">
            <label class="form-label ol-form-label">{{ get_phrase('Field') }}<span class="text-danger ms-1">*</span></label>
            <select name="field" class="form-select ol-select2 ol-modal-select ol-form-control" data-minimum-results-for-search="Infinity">
                <option value="">Select Field</option>
                <option value="number_of_review">Number of Review</option>
                <option value="number_of_5_star_review">Number of 5 star Review</option>
                <option value="number_of_listing">Number of Listing</option>
                <option value="number_of_article">Number of Article</option>
            </select>
        </div>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label ol-form-label">{{ get_phrase('Value From') }}<span class="text-danger ms-1">*</span></label>
                <input type="number" step="0.1" name="value_from" class="form-control ol-form-control" placeholder="Value From">
            </div>
            <div class="col-md-6 mb-3">
                <label class="form-label ol-form-label">{{ get_phrase('Value To') }}<span class="text-danger ms-1">*</span></label>
                <input type="number" step="0.1" name="value_to" class="form-control ol-form-control" placeholder="Value To">
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label ol-form-label">{{ get_phrase('Description') }}</label>
            <textarea name="description" class="form-control ol-form-control"></textarea>
        </div>
        <div class="mb-3">
            <label class="form-label ol-form-label">{{ get_phrase('Badge Icon') }}</label>
            <input type="file" name="icon" class="form-control form-control-file" accept="image/*">
        </div>
        <div class="mb-0">
            <button type="submit" class="ol-btn-primary">{{ get_phrase('Add Badge') }}</button>
        </div>
    </form>
      
    <script>
        if ($('.ol-modal-select').length) {
            $('.ol-modal-select').each(function () {
                // select2 destroy
                if ($(this).hasClass('select2-hidden-accessible')) {
                    $(this).select2('destroy');
                }
                // fresh initialize
                $(this).select2({
                    dropdownParent: $('#ajax-modal')
                });
                // custom class
                $(this).data('select2').$dropdown.addClass('select-drop');
            });
        }
    </script>

