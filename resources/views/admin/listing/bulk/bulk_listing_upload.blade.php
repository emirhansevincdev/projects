<div class="ol-card mt-3">
    <form action="{{route('admin.bulk_upload_store')}}" method="POST"   class="ol-card-body p-3" enctype="multipart/form-data">
        @csrf
        <div class="row">
            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="type" class="form-label ol-form-label"> {{get_phrase('Listing Type')}} </label>
                    <select name="type" id="listing-types" class="form-control ol-select2 ol-form-control" >
                        <option > {{get_phrase('Select listing type')}} </option>
                        @php 
                            $types = App\Models\CustomType::where('status', 1)->orderBy('sorting', 'asc')->get();  
                        @endphp 
                        @foreach($types as $type)
                            <option value="{{$type->slug}}" data-slug="{{$type->id}}"> {{ $type->name }}</option>
                        @endforeach
                    </select>
                </div>
                 <input type="hidden" name="slug_id" id="slug_id">
            </div> 
            <div class="col-sm-6">
                <div class="mb-3">
                    <label for="listing-category" class="form-label ol-form-label"> {{get_phrase('Listing Category')}} </label>
                    <select name="category" id="listing-categorys" class="form-control ol-select2 ol-form-control" >
                        <option value=""> {{get_phrase('Select listing type first')}} </option>
                    </select>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="mb-3">
                    <label class="form-label ol-form-label"> {{get_phrase('Country')}} </label>
                    <select id="bulkCountry" name="country"  class="form-control ol-select2 ol-form-control" >
                        <option> {{get_phrase('Select Country')}} </option>
                         @foreach (App\Models\Country::get() as $country)
                                <option value="{{$country->id}}"> {{get_phrase($country->name)}} </option>
                            @endforeach
                    </select>
                </div>
            </div> 
            <div class="col-sm-6">
                <div class="mb-3">
                    <label  class="form-label ol-form-label"> {{get_phrase('City')}} </label>
                    <select name="city" id="bulkCity" class="form-control ol-select2 ol-form-control" >
                        <option value=""> {{get_phrase('Select Country  First')}} </option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="mb-3">
                    <label for="upload-file" class="form-label ol-form-label"> {{get_phrase('Upload CSV File')}} </label>
                    <input type="file" name="upload_file" id="upload-file" class="form-control ol-form-control" required>
                </div>
              <div class="subMit ">
                    <button type="submit"  class="btn ol-btn-outline-secondary"> {{ get_phrase('Submit') }} </button>
              </div>
        </div>
    </form>
</div>




<script>
    "use strict";
   $('#ajax-modal .ol-select2').select2({
        dropdownParent: $('#ajax-modal')
    });

$("#listing-types").on('change', function() {

    var type = $("#listing-types").val();

    var newurl = "{{route('admin.create.category',['type'=>':type'])}}";
    newurl = newurl.replace(':type', type);

    $.ajax({
        url: newurl,
        type: 'GET',
        success: function(response) {
            var category = $("#listing-categorys");

            category.html(`
                <option value="">Select listing category</option>
            `);

            $.each(response, function(index, item) {
                category.append(`
                    <option value="${item.id}">${item.name}</option>
                `);
            });

           
        }
    });
});



// When dropdown changes, put ID inside hidden input
$("#listing-types").on('change', function() {
    var slugId = $(this).find(':selected').data('slug');
    $("#slug_id").val(slugId);
});



 $("#bulkCountry").on('change', function(){
        var country = $("#bulkCountry").val();
        var url = "{{route('admin.country.city',['id'=>':id'])}}";
        url = url.replace(':id', country);
        $.ajax({
            url: url,
            success: function(result){
                var cityDropdown = $("#bulkCity");
                cityDropdown.html($('<option>', {
                        value: '',
                        text: "{{get_phrase('Select listing City')}}"
                    }));
                $.each(result, function(index, city) {
                    cityDropdown.append($('<option>', {
                        value: city.id,
                        text: city.name
                    }));
                });
            }
        })
    })


</script>

