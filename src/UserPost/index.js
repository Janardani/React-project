import React, { useState, useEffect } from "react";
import LoadingCard from "./LoadingCard";
import { useDispatch, useSelector } from "react-redux"
import { getpost, deletepost, setEdit, updatepost } from "../Redux/Features/Postslice";

import { Button, Card, Input, Space } from "antd";

const UserPost = ({ history }) => {
  const [id, setId] = useState();
  const [bodyText, setBodyText] = useState("");
  const dispatch = useDispatch();
  const { loading, post, edit, body } = useSelector((state) => ({ ...state.app }))
  const onChangeInput = (e) => {
    setId(e.target.value);
  };


  const fetchUserPost = () => {
    if (!id) {
      window.alert("Please enter id");
    } else {
      dispatch(getpost({ id }));
      setId("");
    }
  };
  useEffect(() => {
    setBodyText(body);
  }, [body])


  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Fetch Post</h1>
      <Input
        placeholder="Enter User Id"
        type="number"
        onChange={onChangeInput}
        value={id}
        style={{ width: "300px" }}
      />
      <br />
      <br />
      <Space size="middle" style={{ margin: 10 }}>
        <Button type="primary" onClick={fetchUserPost}>
          Fetch User Post
        </Button>
        <Button type="primary" onClick={() => history.push("/create")}>
          Create User Post
        </Button>
      </Space>
      <br />
      <br />
      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <>
          {post.length > 0 && (
            <div className="site-card-border-less-wrapper">
              <Card type="inner" title={post[0].title}>
                <p>User Id: {post[0].id}</p>
                {edit ? (
                  <>
                    <Input.TextArea
                      rows={4}
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                    />
                    <Space
                      size="middle"
                      style={{
                        marginTop: 5,
                        marginLeft: 5,
                      }}
                    >
                      <Button type="primary" onClick={() => {dispatch(updatepost({id:post[0].id,title:post[0].title,body:bodyText})) ; dispatch(setEdit({edit:false,body:post[0].body}))}}>Save</Button>
                      <Button onClick={() => dispatch(setEdit({edit:false,body:post[0].body}))}>Cancel</Button>
                    </Space>
                  </>
                ) : (
                  <span>{post[0].body}</span>
                )}
              </Card>
              <Space
                size="middle"
                style={{
                  marginTop: 35,
                  marginLeft: 5,
                  float: "right",
                }}
              >
                <Button
                  style={{ cursor: "pointer" }}
                  type="primary"
                  disabled={edit}
                  danger
                  onClick = { () => dispatch(deletepost({id : post[0].id}))}
                >
                  Delete
                </Button>

                <Button type="primary" onClick={() => dispatch(setEdit({edit:true,body:post[0].body}))}>Edit </Button>
              </Space>
            </div>
      )}
    </>
  )
}
    </div >
  );
};

export default UserPost;
