// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import {VDateInput} from "vuetify/labs/components";

export default createVuetify(
    {
        theme: {
            defaultTheme: 'dark'
        },
        components: {
            VDateInput,
        }
    }
)
