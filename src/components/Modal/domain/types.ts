export interface BaseDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}
