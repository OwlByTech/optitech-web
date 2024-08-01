export async function uploadFileHandler(
  extensions: Array<string>,
  maxSizeInMB: number
): Promise<FileList | null> {
  return new Promise((resolve, reject) => {
    try {
      const fileInput: HTMLInputElement = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = extensions.join(',');

      fileInput.onchange = (e: Event) => {
        const files = (<HTMLInputElement>e.target).files;
        if (!files) {
          return resolve(null);
        }

        try {
          filesValidations(files, extensions, maxSizeInMB);
        } catch (e) {
          reject(e);
        }

        resolve(files);
      };

      fileInput.click();
    } catch (e) {
      reject(e);
    }
  });
}

export function filesValidations(files: FileList, extensions: Array<string>, maxSizeInMB: number) {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  const acceptedExtensions = extensions.map(ext => ext.toLowerCase());

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !acceptedExtensions.includes(fileExtension)) {
      throw new Error(`Solo [${extensions.join(', ')}] son archivos permitidos`);
    }

    if (file.size > maxSizeInBytes) {
      throw new Error(`File size exceeds the limit of ${maxSizeInMB} MB.`);
    }
  }
}
