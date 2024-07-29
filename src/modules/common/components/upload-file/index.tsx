import { useState, useRef, useEffect } from "react";
import { AiFillFile } from "react-icons/ai";
import { FiFile, FiPlus, FiUpload, FiX } from "react-icons/fi";
import { toast } from "sonner";

type Props = {
    separatedFiles?: boolean;
    required?: boolean;
    multiple?: boolean;
    name: string;
    preview?: boolean;
    acceptedFileExtensions: string[];
    selectedFiles: any;
    onSelectedFile: (files: File[]) => void;
};

export function UploadFile(props: Props) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>(
        props.selectedFiles
    );
    const [error, setError] = useState("");
    const [previewLoad, setPreview] = useState(null);

    const fileInputRef = useRef(null);
    const buttonRef = useRef(null);
    const acceptedFileTypesString = props.acceptedFileExtensions
        .map((ext) => `.${ext}`)
        .join(",");

    useEffect(() => {
        props.onSelectedFile(selectedFiles);
    }, [selectedFiles]);

    useEffect(() => {
        if (selectedFiles[0] && props.preview) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFiles[0]);
        } else {
            setPreview(null);
        }
    }, [selectedFiles]);

    const handleFileChange = (event: any) => {
        const newFilesArray = Array.from(event.target.files);
        processFiles(newFilesArray);
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        processFiles(droppedFiles);
    };

    const processFiles = (filesArray: any) => {
        const newSelectedFiles = [...selectedFiles];
        let hasError = false;
        const fileTypeRegex = new RegExp(
            props.acceptedFileExtensions.join("|"),
            "i"
        );

        filesArray.forEach((file: any) => {
            if (
                props.multiple &&
                newSelectedFiles.some((f: any) => f.name === file.name)
            ) {
                toast.info("Archivos duplicados");
                hasError = true;
            } else if (!fileTypeRegex.test(file.name.split(".").pop())) {
                toast.info(
                    `Solo ${props.acceptedFileExtensions.join(
                        ", "
                    )} son archivos  permitidos`
                );
                hasError = true;
            } else if (props.multiple) {
                newSelectedFiles.push(file);
            } else {
                newSelectedFiles[0] = file;
            }
        });

        if (!hasError) {
            setError("");
            setSelectedFiles(newSelectedFiles);
        } else {
            fileInputRef.current.value = null;
        }
    };

    const handleFileDelete = (index: any) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };

    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };
    const focusInput = () => {
        buttonRef.current.focus();
    };

    return (
        <div className={`flex flex-grow  flex-col gap-4 `}>
            <button
                className={` flex justify-center border-2 rounded-lg flex-col border-dashed gap-4 items-center hover:border-black py-4 ${!props.multiple ? "min-h-[20rem]" : " min-h-16"
                    } overflow-auto focus:outline-none focus:border-none focus:ring-inset focus:ring-2 focus:ring-black `}
                type="button"
                name={props.name}
                ref={buttonRef}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e)}
                onClick={handleCustomButtonClick}
            >
                {props.preview && previewLoad && (
                    <img src={previewLoad} className="h-60 w-60" />
                )}

                {!props.preview && (
                    <>
                        <FiUpload
                            className={`${props.multiple ? "w-6 h-6" : "w-10 h-10"}`}
                        />
                        <p className="text-xs font-light">Drag and Drop the files</p>
                    </>
                )}
                <input
                    type="file"
                    id="files"
                    name={props.name}
                    required={props.required}
                    multiple={props.multiple}
                    accept={acceptedFileTypesString}
                    ref={fileInputRef}
                    className="w-0 h-0"
                    onChange={handleFileChange}
                    onFocus={focusInput}
                    onClick={(event) => {
                        event.target.value = null;
                    }}
                />
                {error && <p className="text-xs font-normal text-red-500">{error}</p>}
            </button>
            {props.multiple && selectedFiles.length > 0 && (
                <div className=" w-full py-4 max-h-[23rem] overflow-auto">
                    {selectedFiles.length > 0 && (
                        <ul className="flex flex-col gap-2 ">
                            {selectedFiles.map((file, index) => (
                                <li
                                    key={index}
                                    className="flex justify-between items-center bg-gray-100 rounded-lg py-4 px-2"
                                >
                                    <div className="flex gap-2 items-center">
                                        {file.name.includes(".pdf") ? (
                                            <img src="/pdf.svg" className="h-6 w-6" />
                                        ) : file.name.includes(".doc") ? (
                                            <img src="/doc.svg" className="h-6 w-6" />
                                        ) : (
                                            <AiFillFile className="h-6 w-6" strokeWidth={1} />
                                        )}
                                        <span className="text-sm">{file.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleFileDelete(index)}
                                        className=" hover:text-red-700 focus:outline-none"
                                    >
                                        <FiX className={"h-5 w-5"} strokeWidth={1} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
