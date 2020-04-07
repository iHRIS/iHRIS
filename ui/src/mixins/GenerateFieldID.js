export default {
  methods: {
    generateFieldId(formName, fieldName) {
      if (formName == null || fieldName == null) {
        return "";
      } else {
        var sanitizedFieldName =
          fieldName.split(".").length > 0
            ? fieldName.replace(/\./g, "_")
            : fieldName;
        return (formName + "_" + sanitizedFieldName).toLowerCase();
      }
    }
  }
};
