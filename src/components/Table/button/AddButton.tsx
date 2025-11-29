import { Button } from "antd";
import React from "react";

interface AddNewButtonProps {
  onClick?: () => void;
}

const AddNewButton: React.FC<AddNewButtonProps> = ({ onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end", // دکمه سمت چپ
        alignItems: "center", // وسط‌چین عمودی
        paddingLeft: "20px",
        zIndex:100
      }}
    >
      <Button
       onClick={onClick} 
        style={{
          padding: 10,
          backgroundColor: "rgba(59, 173, 255, 0.12)",
          color: "rgba(81, 136, 254, 0.83)",
          border: "1px solid rgba(81, 136, 254, 0.83)",
          fontSize: "14px",
          marginTop: "2px",
        }}
        // onClick={() => handleEdit(record)}
      >
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="5188FE"
          style={{marginLeft:"-6px"}}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0" />

          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <g id="SVGRepo_iconCarrier">
            <g id="Edit / Add_Row">
              <path
                id="Vector"
                d="M3 14V15C3 16.1046 3.89543 17 5 17L19 17C20.1046 17 21 16.1046 21 15L21 13C21 11.8954 20.1046 11 19 11H13M10 8H7M7 8H4M7 8V5M7 8V11"
                stroke="rgba(81, 136, 254, 0.83)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </g>
        </svg>
        افزودن
      </Button>
    </div>
  );
};

export default AddNewButton;
