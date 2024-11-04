import Swal from "sweetalert2";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const checkFileValid = async (file: File) => {
  if (!isFileTypeAllowed(file.type)) {
    await Swal.fire({
      icon: "warning",
      width: "50%",
      text: `${file.name}은(는) 지원하지 않는 형식입니다. JPG, JPEG, PNG 형식만 업로드 가능합니다.`,
      confirmButtonColor: "#5498FF",
      confirmButtonText: "닫기",
    });
    return null;
  }

  if (file.size > MAX_FILE_SIZE) {
    await Swal.fire({
      icon: "warning",
      width: "50%",
      text: `${file.name}은(는) 파일 크기가 5MB를 초과하였습니다.`,
      confirmButtonColor: "#5498FF",
      confirmButtonText: "닫기",
    });
    return null;
  }

  const isValidImage = await checkFileTypeIsValid(file);
  if (!isValidImage) {
    await Swal.fire({
      icon: "warning",
      width: "50%",
      text: `${file.name}은(는) 잘못된 파일입니다. 파일 형식을 확인해주세요.`,
      confirmButtonColor: "#5498FF",
      confirmButtonText: "닫기",
    });
    return null;
  }

  return file;
};

const isFileTypeAllowed = (fileType: string) => {
  return ALLOWED_FILE_TYPES.includes(fileType);
};

const checkFileTypeIsValid = (file: File): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      const arr = new Uint8Array(reader.result as ArrayBuffer).subarray(0, 4);
      let header = "";
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }

      let fileType;
      switch (header) {
        case "89504e47":
          fileType = "image/png";
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          fileType = "image/jpeg";
          break;
        default:
          fileType = "";
          break;
      }

      resolve(ALLOWED_FILE_TYPES.includes(fileType));
    };

    reader.onerror = function () {
      reject(false);
    };

    reader.readAsArrayBuffer(file);
  });
};
