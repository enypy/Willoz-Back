declare namespace Express {
  interface Request {
    user: {
      userId: string
      name: string
    }
    files: {
      image: UploadedFile;
    }
  }
}