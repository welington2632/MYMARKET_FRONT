class FormJson {

    static  ConvertFormJson (form) {
        var formdata = form.serializeArray();
        var data = {};
        $(formdata).each(function (index, obj) {
                data[obj.name] = obj.value;
        });
        return data;
    }
}