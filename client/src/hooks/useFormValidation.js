import {useCallback, useState} from "react";
import {clone} from "../other/utils";
import {checkValidControl, checkValidForm} from "../other/validation";

export function useFormValidation(controlConfig) {
	const [formControls, setFormControls] = useState(controlConfig());
	const [isValidForm, setIsValidForm] = useState(false)

	const changeHandler = useCallback((value, controlName) => {
		const copyFormControls = clone(formControls)
		const control = copyFormControls[controlName];
		control.value = value;
		control.touched = true;
		control.valid = checkValidControl(value, control.validation);
		copyFormControls[controlName] = control

		setFormControls(copyFormControls);
		setIsValidForm(checkValidForm(copyFormControls));
	}, [formControls])

	const resetFormControls = useCallback(() => setFormControls(controlConfig()), [controlConfig])

	return {formControls, isValidForm, changeHandler, resetFormControls}
}