import { useState } from "react";
import { Button, Modal, message } from "antd";
// import { AdminPanelAPI } from "../../api/axios";

interface DeactivateButtonProps {
  id: string | string[];
  onDeactivateSuccess?: (id: string | string[]) => void;
  text?: string;
}

const DeactivateButton: React.FC<DeactivateButtonProps> = ({
  id,
  onDeactivateSuccess,
  text = "deactivate",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = async () => {
    setLoading(true);
    // try {
    //   await AdminPanelAPI.DeactivatePatient(id);
    //   message.success("با موفقیت غیر فعال شد ✅");
    //   onDeactivateSuccess?.(id);
    // } catch (error: any) {
    //   message.error(error.response?.data?.message || "عملیات با خطا مواجه شد ❌");
    // } finally {
    //   setLoading(false);
    //   setIsModalOpen(false);
    // }
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      message.success("با موفقیت غیر فعال شد ✅");

      // حذف از لیست در کامپوننت والد
      onDeactivateSuccess?.(id);
    }, 1000); // شبیه‌سازی 1 ثانیه تأخیر
  };

  return (
    <>
      <Button
        style={{
          padding: 8,
          backgroundColor: "rgba(81, 81, 81, 0.07)",
          color: "rgb(112, 112, 112)",
          border: "1px solid rgb(112, 112, 112)",
          fontSize: "12px",
        }}
        onClick={showModal}
        loading={loading}
      >
        <img
          src="/img/deactive-account.png"
          alt="deactive"
          style={{ width: "20px", marginLeft: "-5px" }}
        />
        <span style={{ marginBottom: "-2px" }}>{text}</span>
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="غیر فعال کردن"
        cancelText="انصراف"
        title="آیا میخواهید این بیمار رو غیر فعال کنید؟"
      ></Modal>
    </>
  );
};

export default DeactivateButton;
