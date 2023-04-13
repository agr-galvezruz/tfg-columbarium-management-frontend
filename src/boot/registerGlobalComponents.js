import { boot } from 'quasar/wrappers';

// Form components
import CustomInput from 'src/components/form-components/custom-input';
import CustomSelect from 'src/components/form-components/custom-select';
import CustomButton from 'src/components/form-components/custom-button';
// import CustomPhoneInput from 'src/components/form-components/custom-phone-input';
// import CustomPhoneInputV2 from 'src/components/form-components/custom-phone-input-v2/QPhoneInput';
// import CustomDatePickerV2 from 'src/components/form-components/custom-date-picker-v2';

export default boot(async ({ app }) => {
  // Form components
  app.component('custom-input', CustomInput);
  app.component('custom-select', CustomSelect);
  app.component('custom-button', CustomButton);
  // app.component('custom-phone-input', CustomPhoneInput);
  // app.component('custom-phone-input-v2', CustomPhoneInputV2);
  // app.component('custom-date-picker-v2', CustomDatePickerV2);
});