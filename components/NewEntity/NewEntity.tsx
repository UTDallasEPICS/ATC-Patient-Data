import { useState, useEffect } from "react";
import Avatar from "../Avatar";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Input, InputType } from "./Interfaces";
import styles from "../../styles/NewEntity.module.css";


const NewEntity = (props: {
    entityType: string;
    textFields: Input[];
    submitFunction: (fields: Input[]) => Promise<void>;
}) => {
    const [imgPreview, setImagePreview] = useState("/default-avatar.jpg");
    const [textInputs, setTextInputs] = useState([]);

    useEffect(() => {
        setTextInputs(props.textFields);
    }, [props.textFields]);

    const { register, handleSubmit } = useForm();

    const onSubmit = async () => {
        await props.submitFunction(textInputs);
    };

    const updateImageDisplay = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (validFileType(file)) {
                const imgSRC = URL.createObjectURL(file);
                setImagePreview(imgSRC);
            }
        }
    };

    const getComponent = (input: Input) => {
        switch (input.type) {
            case InputType.TEXT:
            case InputType.DATE:
            case InputType.MULTILINE_TEXT:
                return (
                    <TextField
                        key={input.attributeName}
                        id={input.attributeName}
                        label={input.name || input.attributeName}
                        variant="outlined"
                        className={styles.inputField}
                        onChange={(e) =>
                            updateInput(input.attributeName, e.target.value)
                        }
                        required={input.required}
                        defaultValue={input.value || ""}
                    />
                );
        }
    };

    const updateInput = (attributeName: string, newValue: string) => {
        setTextInputs((oldInputs) =>
            oldInputs.map((oldInput) => {
                if (oldInput.attributeName === attributeName) {
                    oldInput.value = newValue;
                }
                return oldInput;
            })
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Avatar diameter="175px" img={imgPreview} />
                <label htmlFor="image_upload">
                    <strong>Upload Picture (Optional)</strong>
                </label>
                <input
                    id="image_upload"
                    name="image_upload"
                    ref={register}
                    type="file"
                    accept="image/*"
                    onChange={updateImageDisplay}
                />
            </div>
            {textInputs.map((input: Input) => {
                return getComponent(input);
            })}
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </form>
    );
};

const imageFileTypes = [
    "image/apng",
    "image/bmp",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
];

const validFileType = (file) => {
    return imageFileTypes.includes(file.type);
};

export default NewEntity;
