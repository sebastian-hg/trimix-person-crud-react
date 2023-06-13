/ useGenericInput
import TextField from '@mui/material/TextField';
import { Field, FieldProps } from 'formik';
import { KeyboardEvent } from 'react';
// import MessageErrorMaterial from '../components/message-error/message-error-material';
// import {
//   OnChangeActionsMaterialInputProps,
//   OnKeyDownMaterialActionsProps
// } from '../interfaces/hooks/generic-common-interfaces';
// import useInputHelpers from './useInputHelpers';

interface GenericInputProps {
  isMandatory: boolean;
  formId: string;
  label: string;
  placeholder: string;
  type: string;
}

/**
 * @description Custom Hook que se utiliza para renderizar un input en un formulario,
 * incluyendo su label y los mensajes de error programáticos.
 *
 * @param {string} formId Parámetro que debe coincidir con el name definido en los initial values del form.
 * @param {string} label Etiqueta a mostrar previa al input renderizado (ej: Seleccione un sexo).
 * @param {string} placeholder Leyenda que se mostrará como placeholder dentro del input.
 * @param {string} type Parámetro html que debe indicarse (ej: text, password, number).
 * @param {boolean} isMandatory Parámetro booleano para indicar que el campo es obligatorio. Si lo es,
 *
 *  @returns {JSX.Element}
 */

const GenericMaterialInput = ({
  formId,
  isMandatory,
  label,
  placeholder,
  type,
}: GenericInputProps): JSX.Element => {
//   const { getFormInputClassname, preventNonNumericMaterialInput, birthDateInputStyle } = useInputHelpers();

//   const handleOnChange = ({ e, field, form }: OnChangeActionsMaterialInputProps) => {
//     if (onChangeActions) onChangeActions({ e, field, form });
//     if (toUppercase) {
//       form.setFieldValue(field.name, e.target.value.toUpperCase());
//       return;
//     }
//     field.onChange(e);
//   };

//   const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
//     if (onKeyDownActions) onKeyDownActions({ e });
//     if (onlyNumbers) preventNonNumericMaterialInput(e);
//   };

//   const handleStyles = (field: any, form: any): string => {
//     return type === 'date' ? birthDateInputStyle(field) : getFormInputClassname({
//       disabled: disabled,
//       errors: form.errors,
//       fieldName: field.name,
//       touched: form.touched,
//     });
//   }

  return (
    <>
      <Field  name={formId}>
        {({ field, form, meta }: FieldProps<any, any>) => {
          return (
            <>
              <TextField
                fullWidth
                {...field}
                label={`${label}${isMandatory ? ' (*)' : ''}`}
                className={}
                error={meta.touched && meta.error ? true : false}
                inputProps={{

                }}
                placeholder={placeholder}
                type={type}
                /**
                 * @todo revisar situación en la cual se envía un value, ya que
                 * al hacer esta asignación, si bien el input toma el valor ingresado,
                 * ese valor no es registrado en el form
                 */
              />
              {/* {meta.touched && meta.error ? <MessageErrorMaterial msg={meta.error} /> : null} */}
            </>
          );
        }}
      </Field>
    </>
  );
};

interface UseGenericInputProps {
  isMandatory?: boolean;
  label: string;
  formId: string;
  placeholder: string;
  type?: string;
}

/**
 * @description Custom Hook que se utiliza para renderizar un input en un formulario,
 * incluyendo su label y los mensajes de error programáticos. El hook debe ser llamado
 * dentro de un contexto Formik, es decir, debe llamarse dentro de componentes hijos del
 * componente Formik, ya que utiliza los métodos internos de Formik para declarar y manipular
 * el input interno.
 *
 * @param {string} formId Parámetro que debe coincidir con el name definido en los initial values del form.
 * @param {string} label Etiqueta a mostrar previa al input renderizado (ej: Seleccione un sexo).
 * @param {number} [maxLength] Etiqueta que permite validar el máximo de caracteres del input.
 * @param {number} [minLength] Etiqueta que permite validar el mínimo de caracteres del input.
 * @param {string} placeholder Leyenda que se mostrará como placeholder dentro del input.
 * @param {boolean} [disabled] Parámetro opcional para colocar el campo como deshabilitado.
 * @param {boolean} [isMandatory] Parámetro opcional para indicar que el campo es obligatorio. Si lo es,
 * incluye un asterisco al lado del label (ej: Seleccione un sexo (*)). Por defecto se encuentra en true.
 * @param {() => void} [onChangeActions] Callback opcional para suministrarle al hook, el cual se ejecutará al
 * detectar cambios en el campo. Recibe un objeto con el evento que disparó el cambio, y los objetos internos
 * de Formik 'field' y 'form'.
 * @param {() => void} [onKeyDownActions] Callback opcional para suministrarle al hook, el cual se ejecutará en
 * el onKeyDown del campo. Recibe un objeto con el evento que disparó el cambio.
 * @param {boolean} [onlyNumbers] Parámetro que indica que sólo se pueden ingresar números en el input.
 * Además de permitir sólo el ingreso de número, también se permiten diversas teclas funcionales
 * para no reducir la usabilidad del sistema.
 * @param {boolean} [toUppercase] Permite transformar el input del usuario en uppercase.
 * @param {string} [type] Parámetro opcional para indicar el tipo de input (ej: text, password, number).
 * Por default se setea en 'text'.
 * @param {*} [value] Parámetro opcional para colocar un valor por defecto a los input (SOLO acepta medium y small).
 * @param {string} size Parámetro opcional que permite modificar el tamaño del input pasandole small y traendo como defecto medium.
 */
export const useGenericMaterialInput = ({
  formId,
  isMandatory = true,
  label,
  placeholder,
  type = 'text',
}: UseGenericInputProps): any[] => {
  return [
    <GenericMaterialInput
      formId={formId}
      isMandatory={isMandatory}
      key={formId}
      label={label}
      onKeyDownActions={onKeyDownActions}
      onlyNumbers={onlyNumbers}
      placeholder={placeholder}
      toUppercase={toUppercase}
      type={type}
      value={value}
      maxLength={maxLength}
      minLength={minLength}
      size={size}
    />
  ];
};

export default useGenericMaterialInput;