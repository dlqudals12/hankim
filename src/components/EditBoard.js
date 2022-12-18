import { Edit, Folder, OtherHouses } from "@mui/icons-material";
import {
  Button,
  Card,
  Dialog,
  Divider,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useAtom } from "jotai";
import React, { useState, useEffect, useRef } from "react";
import { AlertPopupData, Refresh, RowChangeData } from "./data/Atom";
import { Editor } from "@tinymce/tinymce-react";
import { Header } from "./Header";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Footer } from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";

export const EditBoard = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const [refresh, setRefresh] = useAtom(Refresh);
  const [rowChangeData, setRowChangeData] = useAtom(RowChangeData);
  const editorRef = useRef(null);
  const [alertPopupData, setAlertPopupData] = useAtom(AlertPopupData);
  const [changeMod, setChangeMod] = useState(location.state.changeMod);

  const onClickAddUpd = () => {
    let row = JSON.parse(localStorage.getItem("row"));

    if (Boolean(rowChangeData.title)) {
      if (changeMod === "ADD") {
        if (
          !row
            .map(items => {
              return items.title === rowChangeData.title;
            })
            .includes(true)
        ) {
          row.push(rowChangeData);
          localStorage.removeItem("row");
          localStorage.setItem("row", JSON.stringify(row));
          setAlertPopupData({
            ...alertPopupData,
            msg: rowChangeData.title + "가 추가되었습니다.",
            open: true,
            rightCallback: () => {
              setAlertPopupData({ ...alertPopupData, open: false });
              setRefresh(!refresh);
              navigate("/");
            }
          });
        } else {
          setAlertPopupData({
            ...alertPopupData,
            msg: "Title이 중복되었습니다.",
            open: true,
            rightCallback: () => {
              setAlertPopupData({ ...alertPopupData, open: false });
            }
          });
        }
      } else {
        const updRow = row.map(item => {
          return item.id === rowChangeData.id ? rowChangeData : item;
        });
        localStorage.removeItem("row");
        localStorage.setItem("row", JSON.stringify(updRow));
        setRefresh(!refresh);

        setAlertPopupData({
          ...alertPopupData,
          msg: rowChangeData.title + "가 변경되었습니다.",
          open: true,
          rightCallback: () => {
            setAlertPopupData({ ...alertPopupData, open: false });
            setRefresh(!refresh);
            navigate("/");
          }
        });
      }
    } else {
      setAlertPopupData({
        ...alertPopupData,
        open: true,
        msg: "제목을 입력해 주세요.",
        rightCallback: () => {
          setAlertPopupData({ ...alertPopupData, open: false });
        }
      });
    }
  };

  const rows = JSON.parse(localStorage.getItem("row"));

  useEffect(() => {
    if (location.state.changeMod === "ADD") {
      setRowChangeData({
        ...rowChangeData,
        id: rows[rows.length - 1].id + 1,
        user: localStorage.getItem("isLogin")
          ? JSON.parse(localStorage.getItem("isLogin")).id.toString()
          : "Guest"
      });
    } else {
      const updRow = JSON.parse(localStorage.getItem("row")).find(
        e => e.id === location.state.id
      );
      setRowChangeData(updRow);
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F4F5F7"
      }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F4F5F7",
          marginBottom: "120px"
        }}
      >
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontSize: "18px",
            marginBottom: "100px",
            marginTop: "120px",
            fontFamily: "NotoSansKRBold"
          }}
        >
          게시판 등록
        </Typography>
        <Card sx={{ width: "60%", marginLeft: "20%" }}>
          <Box sx={{ padding: "30px" }}>
            <InputLabel>제목</InputLabel>
            <OutlinedInput
              sx={{ marginTop: "10px", width: "100%", height: "50px" }}
              value={rowChangeData.title}
              onChange={e => {
                setRowChangeData({ ...rowChangeData, title: e.target.value });
              }}
            />
            <InputLabel sx={{ marginTop: "15px" }}>유저</InputLabel>
            <OutlinedInput
              sx={{ marginTop: "10px", width: "100%", height: "50px" }}
              value={rowChangeData.user}
              readOnly
            />

            <Typography
              sx={{ width: "50px", marginTop: "15px", marginBottom: "10px" }}
            >
              내용
            </Typography>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={(e, v) => {
                setRowChangeData({ ...rowChangeData, description: e });
              }}
              apiKey="bpu3h00xk10rw9yr1we1pn726jvlyj96te1xvt21mo9l6fmq"
              value={rowChangeData.description}
              init={{
                height: 385,
                menubar: false,
                plugins: "image code",
                toolbar: "link image",
                /* enable title field in the Image dialog*/
                image_title: false,
                /* enable automatic uploads of images represented by blob or data URIs*/
                automatic_uploads: false,
                /*
                        URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                        images_upload_url: 'postAcceptor.php',
                        here we add custom filepicker only to Image dialog
                      */
                file_picker_types: "image",
                image_advtab: false,
                selector: "textarea#file-picker",
                /* and here's our custom image picker*/
                file_picker_callback: function(cb, value, meta) {
                  var input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*");

                  input.onchange = function() {
                    var file = this.files[0];

                    var reader = new FileReader();
                    reader.onload = function() {
                      var id = "blobid" + new Date().getTime();
                      var blobCache =
                        window.tinymce.activeEditor.editorUpload.blobCache;
                      var base64 = reader.result.split(",")[1];
                      var blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);

                      /* call the callback and populate the Title field with the file name */
                      cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                  };

                  input.click();
                },

                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
              }}
            />
            <Button
              sx={{
                margin: "30px 43% 30px 43%",
                width: "14%",
                backgroundColor: "#DAD9FF",
                color: "#000000"
              }}
              onClick={onClickAddUpd}
            >
              등록
            </Button>
          </Box>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
};
