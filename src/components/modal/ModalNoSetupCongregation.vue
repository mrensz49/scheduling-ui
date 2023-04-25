<template>
    <CModal backdrop="static"  :visible="visibleStaticBackdropDemo">
      <CModalBody>
        <div class="mt-5 bg-danger bg-opacity-10 border-start border-start-5 border-start-danger p-4 pb-3 mb-5">
            <table width="100%">
                <tr>
                    <td width="10%">
                        <svg class="flex-shrink-0 me-2" width="24" height="24" viewBox="0 0 512 512">
                            <rect width="32" height="176" x="240" y="176" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect><rect width="32" height="32" x="240" y="384" fill="var(--ci-primary-color, currentColor)" class="ci-primary"></rect><path fill="var(--ci-primary-color, currentColor)" d="M274.014,16H237.986L16,445.174V496H496V445.174ZM464,464H48V452.959L256,50.826,464,452.959Z" class="ci-primary"></path>
                        </svg>
                    </td>
                    <td>
                        <strong>
                            Oops!
                        </strong>
                        <p>
                            No congregation setup in your account.
                            Please contact the administrator.
                        </p>
                    </td>

                </tr>
            </table>

        </div>
      </CModalBody>
    </CModal>
  </template>
  <script>
    export default {
        mounted() {
            this.visibleStaticBackdropDemo = true
        },
        data() {
            return {
                visibleStaticBackdropDemo: false,
            }
        }
    }
  </script>
