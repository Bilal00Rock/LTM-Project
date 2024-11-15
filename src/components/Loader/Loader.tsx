import { Spin, theme } from "antd";



export const Loader = () => {   
 

  return (
    <div style={{textAlign: 'center' ,background: 'rgba(0, 0, 0, 0.05)', borderRadius: '5px'}}>
      <Spin tip="Loading">
        <div  style={{padding: '50px'}}/>
      </Spin>
    </div>
  );
};
