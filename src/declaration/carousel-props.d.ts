import Photo from "./photo.d.ts";

export interface CarouselProps {
  currentIndex: number;
  photoList: Photo[];
  show: any;
  handlePrevious: any;
  handleNext: any;
  handleClose: any;
}
