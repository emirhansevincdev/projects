@extends('layouts.admin')
@section('title', get_phrase('Create Ads'))
@section('admin_layout')

<link href="{{asset('plugin/summernote/summernote-lite.min.css')}}" rel="stylesheet">
<style>
    .pl-0{
        padding-left: 0;
    }
     .note-editable ul {
        list-style-type: disc;   
        margin: inherit;
        padding: inherit;
    }

    .note-editable ol {
        list-style-type: decimal; 
        margin: inherit;
            padding: inherit;
    }
</style>
<div class="ol-card radius-8px">
    <div class="ol-card-body my-2 py-12px px-20px">
        <div class="d-flex align-items-center justify-content-between gap-3 flex-wrap flex-md-nowrap">
            <h4 class="title fs-16px">
                <i class="fi-rr-settings-sliders me-2"></i>
                {{ get_phrase('Create Ads') }}
            </h4>

            <a href="{{route('admin.ads')}}" class="btn ol-btn-outline-secondary d-flex align-items-center cg-10px">
                <span class="fi-rr-arrow-left"></span>
                <span class="text-capitalize"> {{get_phrase('Back')}} </span>
            </a>   
        </div>
    </div>
</div>

<div class="ol-card mt-3">
    <div class="ol-card-body p-3">
        <form action="{{route('admin.ads.store')}}" method="post" enctype="multipart/form-data">
            @csrf
            <div class="mb-3">
                <label for="title" class="form-label ol-form-label"> {{get_phrase('Ads Title')}} </label>
                <input type="text" class="form-control ol-form-control" name="title" id="title" placeholder="{{get_phrase('Enter adds title')}}" required>
            </div>
            @php
                $types = App\Models\CustomType::where('status',1)->get();
            @endphp
            <div class="mb-3">
                <label for="type" class="form-label ol-form-label"> {{get_phrase('Ads Type')}} </label>
                <select name="type" id="type" class="ol-select2" data-minimum-results-for-search="Infinity" required>
                    <option value=""> {{get_phrase('Select adds type')}} </option>
                    @foreach ($types as $type)
                      <option value="{{$type->slug}}"> {{$type->name}} </option>
                    @endforeach
                </select>
            </div>
            <div class="mb-3">
                <label for="start_date" class="form-label ol-form-label"> {{get_phrase('Start date')}} </label>
                <input type="date" class="form-control ol-form-control" name="start_date" id="start_date" required>
            </div>
            <div class="mb-3">
                <label for="end_date" class="form-label ol-form-label"> {{get_phrase('End date')}} </label>
                <input type="date" class="form-control ol-form-control" name="end_date" id="end_date" required>
            </div>
            <div class="mb-3">
                <label for="url" class="form-label ol-form-label"> {{get_phrase('Url')}} </label>
                <input type="text" class="form-control ol-form-control" name="url" id="url" placeholder="{{get_phrase('Enter url')}}" required>
            </div>
            <div class="mb-3">
                <label for="description" class="form-label ol-form-label"> {{get_phrase('Adds Description')}} </label>
                <textarea id="summernote" name="description"  required></textarea>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label ol-form-label"> {{get_phrase('Ads Banner')}} </label>
                <input type="file" class="form-control form-control-file" name="image" id="image" required>
            </div>
             <div class="mb-3">
                <label for="status" class="form-label ol-form-label"> {{get_phrase('Status')}} </label>
                <select name="status" id="status" class="ol-select2" data-minimum-results-for-search="Infinity" required>
                    <option value=""> {{get_phrase('Select status')}} </option>
                    <option value="1"> {{get_phrase('Active')}} </option>
                    <option value="0"> {{get_phrase('Inactive')}} </option>
                </select>
             </div>  
            <div class="mb-3">
                <button type="submit" class="btn ol-btn-primary px-4"> {{get_phrase('Save')}} </button>
            </div>
        </form>
    </div>
</div>
<script src="{{asset('plugin/summernote/summernote-lite.min.js')}}"></script>
<script type="text/javascript">
    "use strict";
    
      $('#summernote').summernote({
        placeholder: "{{get_phrase('Write Blog description')}}",
        tabsize: 2,
        height: 320,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']]
        ]
      });
</script>
@endsection