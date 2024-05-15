import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Input, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Hero() {
  const users = useSelector((state: RootState) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<any>({
    productName: "",
    image: "",
    price: "",
    type: "",
  });

  const dispatch = useDispatch();
  console.log(users);

  const showModal = (user: any) => {
    setIsModalOpen(true);
    setUpdatedUser(user);
  };

  const handleOk = () => {
    console.log(updatedUser);
    editUser(updatedUser);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  async function getUsers() {
    setLoader(true);
    try {
      const response: any = await axios.get(
        `https://664459266c6a6565870a0015.mockapi.io/all`
      );
      const data = response.data;
      dispatch({ type: "SET_USER", payload: data });
      setLoader(false);
    } catch (error) {
      console.log("Error fetching users:", error);
      setLoader(false);
    }
  }

  async function deleteUser(userId: any) {
    try {
      await axios.delete(
        `https://664459266c6a6565870a0015.mockapi.io/all/${userId}`
      );
      dispatch({ type: "DELETE_USER", payload: userId });

      getUsers();
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  }

  async function editUser(upUser: any) {
    try {
      await axios.put(
        `https://664459266c6a6565870a0015.mockapi.io/all/${upUser.id}`,
        upUser
      );
      dispatch({ type: "CHANGE_USER", payload: upUser });
      getUsers();
    } catch (error) {
      console.log("Error updating user:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  if (loader === true) {
    return <div>lOADER.....</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "0 0 0 50px",
      }}
    >
      {users.map((el: any, idx: number) => {
        return (
          <Card
            key={idx}
            hoverable
            style={{
              margin: "0 10px",
              width: 240,
              height: 340,
            }}
            cover={
              <img
                style={{
                  height: "200px",
                  width: "85%",
                  objectFit: "cover",
                  padding: "10px 0 10px 20px",
                }}
                alt="example"
                src={
                  el.image && el.image.length > 0
                    ? el.image
                    : "https://i.pinimg.com/236x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"
                }
              />
            }
          >
            <h3>{el.productName}</h3>
            <Meta style={{ padding: "5px 0" }} />
            <Button type="primary" danger onClick={() => deleteUser(el.id)}>
              Delete
            </Button>
            {/* <Button
              style={{ marginLeft: "20px" }}
              onClick={() => showModal(el)}
            >
              Edit
            </Button> */}
            <Modal
              title="Edit User"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Input
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
                }
                value={updatedUser.name}
                placeholder="User Name"
              />
              <Input
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, avatar: e.target.value })
                }
                value={updatedUser.avatar}
                placeholder="Image URL"
              />
              <Input
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, job: e.target.value })
                }
                value={updatedUser.job}
                placeholder="Job"
              />
            </Modal>
          </Card>
        );
      })}
    </div>
  );
}

export default Hero;
