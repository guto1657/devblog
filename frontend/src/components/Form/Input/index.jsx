//Imports
import P from "prop-types";
//Styles
import * as Styled from "./styles";

export const Input = ({
    inputName,
    onChangeFn,
    labelText,
    inputType,
    inputValue = "",
    placeholderText = "",
}) => {
    return (
        <Styled.FormControl>
            <Styled.LabelComponent htmlFor={inputName}>
                {labelText}
            </Styled.LabelComponent>
            <Styled.InputComponent
                id={inputName}
                placeholder={placeholderText}
                type={inputType}
                defaultValue={inputValue}
                name={inputName}
                onChange={onChangeFn}
            />
        </Styled.FormControl>
    );
};

//PropTypes validation
Input.propTypes = {
    inputName: P.string.isRequired,
    inputType: P.string.isRequired,
    onChangeFn: P.func.isRequired,
    labelText: P.string.isRequired,
    placeholderText: P.string,
    inputValue: P.oneOfType([P.string, P.number]),
};
