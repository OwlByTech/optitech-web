import { useState, useRef, useEffect } from "react";
import { FiUpload, FiUploadCloud } from "react-icons/fi";

type Props = {
    separatedFiles?: boolean
    required?: boolean
    multiple?: boolean
    name: string
    preview?: boolean
    acceptedFileExtensions: string[]
}

export function UploadFile({ required, multiple, name, preview, acceptedFileExtensions }: Props) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState("");
    const [previewLoad, setPreview] = useState(null);

    const fileInputRef = useRef(null);
    const buttonRef = useRef(null);
    const acceptedFileTypesString = acceptedFileExtensions
        .map((ext) => `.${ext}`)
        .join(",");

    useEffect(() => {
        if (selectedFiles[0] && preview) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFiles[0]);
        } else {
            setPreview(null);
        }
    }, [selectedFiles])

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
        const fileTypeRegex = new RegExp(acceptedFileExtensions.join("|"), "i");

        filesArray.forEach((file: any) => {
            if (multiple && newSelectedFiles.some((f: any) => f.name === file.name)) {
                setError("Archivos duplicados");
                hasError = true;
            } else if (!fileTypeRegex.test(file.name.split(".").pop())) {
                setError(`Solo ${acceptedFileExtensions.join(", ")} son archivos  permitidos`);
                hasError = true;
            } else if (multiple) {
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

    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };
    const focusInput = () => {
        buttonRef.current.focus();
    };

    const handleFileDelete = (index: any) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div className="w-ful lbg-white ">
            <div className="grid grid-cols-1 gap-4">
                <button className=" flex flex-col justify-center border-dashed gap-4 items-center border-2 border-gray-300 hover:border-black rounded-lg  py-4 min-h-[20rem] overflow-auto focus:outline-none focus:border-none focus:ring-inset focus:ring-2 focus:ring-black"
                    type="button"
                    name={name}
                    ref={buttonRef}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e)}
                    onClick={handleCustomButtonClick}
                >
                    {preview && previewLoad ? <img src={previewLoad} className="h-60 w-60" /> :
                        <>
                            <FiUpload className="w-10 h-10" />
                            <p className="text-xs font-light">Drag and Drop the files</p>
                        </>
                    }
                    <input
                        type="file"
                        id="files"
                        name={name}
                        required={required}
                        multiple={false}
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
                {multiple &&
                    <div className="border-2 border-gray-300 rounded-3xl py-4 max-h-[23rem] overflow-auto">
                        {selectedFiles.length > 0 ? (
                            <ul className="px-4">
                                {selectedFiles.map((file, index) => (
                                    <li
                                        key={file.name}
                                        className="flex justify-between items-center border-b py-2"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src="/assets/svg/image.svg"
                                                alt="File Icon"
                                                className="w-8 h-8 mr-2"
                                            />
                                            <span className="text-base">{file.name}</span>
                                        </div>
                                        *   <button
                                            type="button"
                                            onClick={() => handleFileDelete(index)}
                                            className="text-red-500 hover:text-red-700 focus:outline-none"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                    d="M6 4l8 8M14 4l-8 8"
                                                />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="h-full flex justify-center items-center">
                                <p className="text-lg font-semibold text-gray-500 text-center">
                                    No Files Uploaded Yet
                                </p>
                            </div>
                        )}
                    </div>
                }
            </div>

        </div>
    );
}
