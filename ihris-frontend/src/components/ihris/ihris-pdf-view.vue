<template>
  <div>
    <VueHtml2pdf
      :show-layout="true"
      :float-layout="false"
      :enable-download="false"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="nhwr-healthworker.pdf"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <!-- PDF Content Here -->
      </section>
    </VueHtml2pdf>
  </div>
</template>

<script>
import VueHtml2pdf from "vue-html2pdf";

export default {
  components: {
    VueHtml2pdf,
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
  },
};
</script>