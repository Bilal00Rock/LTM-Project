import { useState } from "react";
import { Button, Modal, message } from "antd";
// import { AdminPanelAPI } from "../../api/axios";

interface DeleteButtonProps {
  id: string | string[];
  onDeleteSuccess?: (id: string | string[]) => void;
  text?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  onDeleteSuccess,
  text = "حذف",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleConfirm = async () => {
    setLoading(true);
    // try {
    //   await AdminPanelAPI.deletePatient(id); // تابع API حذف
    //   message.success("حذف با موفقیت انجام شد ✅");
    //   onDeleteSuccess?.(id);
    // } catch (error: any) {
    //   message.error(error.response?.data?.message || "حذف با خطا مواجه شد ❌");
    // } finally {
    //   setLoading(false);
    //   setIsModalOpen(false);
    // }
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      message.success("حذف با موفقیت انجام شد ✅");

      // حذف از لیست در کامپوننت والد
      onDeleteSuccess?.(id);
    }, 1000); // شبیه‌سازی 1 ثانیه تأخیر
  };

  return (
    <>
      <Button
        style={{
          padding: 8,
          backgroundColor: "rgba(254, 81, 81, 0.07)",
          color: "#FE5151",
          border: "1px solid #FE5151",
          fontSize: "12px",
        }}
        onClick={showModal}
        loading={loading}
      >
        <svg
          width="19px"
          height="19px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: "-8px", marginRight: "-3px" }}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <path
              d="M20 14V7C20 5.34315 18.6569 4 17 4H12M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20M13.5 20H7C5.34315 20 4 18.6569 4 17V12"
              stroke="#FE5151"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 4L6.5 6.5M9 9L6.5 6.5M6.5 6.5L9 4M6.5 6.5L4 9"
              stroke="#FE5151"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
        {text}
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="حذف"
        cancelText="انصراف"
        title="آیا از حذف بیمار مطمئن هستید؟"
      >
        <p>این عمل قابل بازگشت نیست!</p>
      </Modal>
    </>
  );
};

export default DeleteButton;
