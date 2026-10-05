<form action="{{ route('admin.customer_bulk_upload_store') }}" method="post" enctype="multipart/form-data">
    @csrf
    <div class="row">
        <div class="col-sm-12 mb-3">
            <label for="csv" class="form-label ol-form-label"> {{get_phrase('Upload CSV File')}} </label>
            <input type="file" class="form-control ol-form-control" name="customer_csv" id="csv">
        </div>
    </div>
    <button type="submit" class="btn ol-btn-primary fs-14px px-4"> {{get_phrase('Update')}} </button>
</form>