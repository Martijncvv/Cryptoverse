import React, { createContext, ReactNode, useContext, useState } from "react";
import { ProjectDetailsModal } from "@/components/modals/ProjectDetailsModal";
import { ConfirmDonationModal } from "@/components/modals/ConfirmDonationModal";
import { DonateModal } from "@/components/modals/DonateModal";

// Define the shape of our modal state
interface ModalState {
  modalType: string | null;
  modalProps: any;
}

// Define the shape of our context
interface ModalContextType {
  openModal: (modalType: string, modalProps?: any) => void;
  closeModal: () => void;
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create a provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<ModalState>({
    modalType: null,
    modalProps: {},
  });

  const openModal = (modalType: string, modalProps = {}) => {
    setModalState({ modalType, modalProps });
  };

  const closeModal = () => {
    setModalState({ modalType: null, modalProps: {} });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {renderModal(modalState.modalType, modalState.modalProps, closeModal)}
    </ModalContext.Provider>
  );
};

const renderModal = (
  modalType: string | null,
  modalProps: any,
  closeModal: () => void,
) => {
  switch (modalType) {
    case "projectDetails":
      return <ProjectDetailsModal {...modalProps} onClose={closeModal} />;
    case "confirmDonation":
      return <ConfirmDonationModal {...modalProps} onClose={closeModal} />;
    case "donateModal":
      return <DonateModal {...modalProps} onClose={closeModal} />;
    default:
      return null;
  }
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
