interface ImgBBImage {
  filename?: string;
  name?: string;
  mime?: string;
  extension?: string;
  url?: string;
}

interface ImgBBdata {
  id?: string;
  title?: string;
  url_viewer?: string;
  url?: string;
  display_url?: string;
  width?: string;
  height?: string;
  size?: string;
  time?: string;
  expiration?: number;
  image?: ImgBBImage;
  thumb?: ImgBBImage;
  medium?: ImgBBImage;
  delete_url?: string;
}

interface ImgBBMetadata {
  data: ImgBBdata;
  success: boolean;
  status: number;
}
