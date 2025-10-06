import { useState } from "react";
import { Button, Modal, message } from "antd";
// import { AdminPanelAPI } from "../../api/axios";

interface ActiveButtonProps {
  id: string | string[];
  onActiveSuccess?: (id: string | string[]) => void;
  text?: string;
}

const ActiveButton: React.FC<ActiveButtonProps> = ({
  id,
  onActiveSuccess,
  text = "active",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = async () => {
    setLoading(true);
    // try {
    //   await AdminPanelAPI.ActivePatient(id);
    //   message.success("با موفقیت فعال شد ✅");
    //   onActiveSuccess?.(id);
    // } catch (error: any) {
    //   message.error(error.response?.data?.message || "عملیات با خطا مواجه شد ❌");
    // } finally {
    //   setLoading(false);
    //   setIsModalOpen(false);
    // }
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      message.success("با موفقیت فعال شد ✅");

      // حذف از لیست در کامپوننت والد
      onActiveSuccess?.(id);
    }, 1000); // شبیه‌سازی 1 ثانیه تأخیر
  };

  return (
    <>
      <Button
        style={{
          padding: 8,
          backgroundColor: "rgba(2, 251, 2, 0.1)",
          color: "rgb(0, 153, 0)",
          border: "1px solid rgb(0, 153, 0)",
          fontSize: "12px",
        }}
        onClick={showModal}
        loading={loading}
      >
        <img
          src="/img/active-account.png"
          alt="active"
          style={{ width: "20px", marginLeft: "-5px" }}
        />
        <span style={{marginBottom:"-2px"}}>{text}</span>
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="فعال کردن"
        cancelText="انصراف"
        title="آیا میخواهید این بیمار رو فعال کنید؟"
      ></Modal>
    </>
  );
};

export default ActiveButton;
