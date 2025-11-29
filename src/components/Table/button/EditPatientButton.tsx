import { Button, Drawer } from "antd";
import { useState } from "react";
import EditPatientForm from "../../Forms/EditForms/EditPatientForm";
import EditDoctorForm from "../../Forms/EditForms/EditDoctorForm";

type EntityType = "patient" | "doctor";

interface Props {
  type: EntityType;
  data: any; 
}

const EditEntityButton = ({ type, data }: Props) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const getTitle = () => {
    if (type === "doctor") return "ویرایش پزشک";
    return "ویرایش بیمار";
  };

  const getForm = () => {
    if (type === "doctor")
      return <EditDoctorForm doctor={data} onClose={closeDrawer} />;
    return <EditPatientForm patient={data} onClose={closeDrawer} open={open} />;
  };

  return (
    <>
      <Button
        style={{
          padding: 5,
          backgroundColor: "rgba(239, 255, 59, 0.14)",
          color: "rgb(255, 174, 0)",
          border: "1px solid rgb(255, 174, 0)",
        }}
        onClick={showDrawer}
        className="button-short"
      >
        <svg
          width="26px"
          height="26px"
          style={{ marginLeft: "-11px" }}
          viewBox="0 -0.5 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.7 5.12758L19.266 6.37458C19.4172 6.51691 19.5025 6.71571 19.5013 6.92339C19.5002 7.13106 19.4128 7.32892 19.26 7.46958L18.07 8.89358L14.021 13.7226C13.9501 13.8037 13.8558 13.8607 13.751 13.8856L11.651 14.3616C11.3755 14.3754 11.1356 14.1751 11.1 13.9016V11.7436C11.1071 11.6395 11.149 11.5409 11.219 11.4636L15.193 6.97058L16.557 5.34158C16.8268 4.98786 17.3204 4.89545 17.7 5.12758Z"
            stroke="rgb(255, 174, 0)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.033 7.61865C12.4472 7.61865 12.783 7.28287 12.783 6.86865C12.783 6.45444 12.4472 6.11865 12.033 6.11865V7.61865ZM9.23301 6.86865V6.11865L9.23121 6.11865L9.23301 6.86865ZM5.50001 10.6187H6.25001L6.25001 10.617L5.50001 10.6187ZM5.50001 16.2437L6.25001 16.2453V16.2437H5.50001ZM9.23301 19.9937L9.23121 20.7437H9.23301V19.9937ZM14.833 19.9937V20.7437L14.8348 20.7437L14.833 19.9937ZM18.566 16.2437H17.816L17.816 16.2453L18.566 16.2437ZM19.316 12.4937C19.316 12.0794 18.9802 11.7437 18.566 11.7437C18.1518 11.7437 17.816 12.0794 17.816 12.4937H19.316ZM8.30001 17.9317H15.767V16.4317H8.30001V17.9317Z"
            fill="rgb(255, 174, 0)"
          />
        </svg>
        <span>ویرایش</span>
      </Button>

      <Drawer
        title={getTitle()}
        placement="left"
        closable
        open={open}
        onClose={closeDrawer}
        width={720}
        styles={{
          mask: { backdropFilter: "blur(2px)" },
          body: { paddingBottom: 80 },
        }}
      >
        {getForm()}
      </Drawer>
    </>
  );
};

export default EditEntityButton;
