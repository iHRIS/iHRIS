<template>
  <v-stepper v-model="stepper">
    <v-stepper-items>
      <v-stepper-content step="1">
        <WorkflowForm v-on:nextStep="importData" />
      </v-stepper-content>
      <v-stepper-content step="2">
        <WorkflowReview
          :amount="frequencyAmount"
          :frequency="frequency"
          :period="period"
          :practitioners="selected"
          :specifics="frequencySpecifics"
          :workflow="workflow"
          :workflowName="workflowName"
          v-on:editWorkflow="changeWorkflow"
        />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import WorkflowForm from "@/components/MHero/WorkflowForm.vue";
import WorkflowReview from "@/components/MHero/WorkflowReview.vue";

export default {
  components: {
    WorkflowForm,
    WorkflowReview
  },
  data() {
    return {
      frequency: false,
      frequencyAmount: null,
      frequencySpecifics: null,
      period: null,
      selected: [],
      stepper: 0,
      workflow: [],
      workflowName: null
    };
  },
  methods: {
    changeWorkflow() {
      this.stepper = 1;
    },
    importData(
      selected,
      frequency,
      frequencyAmount,
      period,
      workflow,
      workflowName,
      frequencySpecifics
    ) {
      this.frequency = frequency;
      this.frequencyAmount = frequencyAmount;
      this.frequencySpecifics = frequencySpecifics;
      this.period = period;
      this.selected = selected;
      this.workflow = workflow;
      this.workflowName = workflowName;

      this.stepper = 2;
    }
  }
};
</script>
