<template>
  <div class="test">
    <slot-outer max="2">
      <template #default="slotProps">
        FIRST
        <slot-inner :slotProps="slotProps">
        </slot-inner>
        <slot-outer max="3">
          <template #default="slotProps">
            SECOND
            <slot-inner :slotProps="slotProps">
            </slot-inner>
          </template>
        </slot-outer>
      </template>
    </slot-outer>
    <slot-inner>ALONE</slot-inner>
  </div>
</template>

<script>
// @ is an alias to /src
import SlotOuter from "@/components/slot-outer"
import SlotInner from "@/components/slot-inner"

export default {
  name: "slot-test",
  data: () => ({
      }),
  components: {
    SlotOuter,
    SlotInner,
  },
  created: function() {
  }
}

</script>
