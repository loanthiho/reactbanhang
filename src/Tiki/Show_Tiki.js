import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import DataTable from "react-data-table-component";
import Swal from 'sweetalert';

class Show_Tiki extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.submitEditProduct = this.submitEditProduct.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await axios.get("http://127.0.0.1:8000/api/get-Tiki").then((res) => {
      this.setState(() => ({ products: res.data }));
    });
  }
  
  previewImage() {
    $(document).ready(function () {
      $("#inputImage").change(function () {
        let reader = new FileReader();
        reader.onload = (e) => {
          $("#preview-image-before-upload").attr("src", e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
      });
    });
  }

  previewEditImage() {
    $(document).ready(function (e) {
      $("#editImage").change(function () {
        let reader = new FileReader();
        reader.onload = (e) => {
          $("#preview-image-before-edit").attr("src", e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
      });
    });
  }

  async onSubmitHandle(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append("uploadImage", this.state.fileUpload);

    if ($("#inputImage").val().split("\\")[2]) {
      await axios
        .post('http://localhost:8000/api/upload-image', fd)
        .then((res) => {});
    }

    await axios
      .post("http://localhost:8000/api/add-Tiki", {
        name: $("#inputName").val(),
        price: $("#inputPrice").val(),
        description: $("#inputDescription").val(),
        image: $("#inputImage").val().split("\\")[2],
        rate: $("#inputType").val(),
      })
      .then((res) => {
        $("#inputImage").val("");
        Swal({
          text: "Thêm thành công",
          icon: "success",
          button: "OK",
        });
        $("#closeModalAddBtn").click();
        this.componentDidMount();
      })
      Swal({
        text: "Thêm thành công",
        icon: "success",
        button: "OK",
      });
  }

  async deleteProduct(id) {
    if (window.confirm(`Bạn muốn xóa sản phẩm có id là ${id}`)) {
      await axios
        .delete('http://localhost:8000/api/delete-Tiki/${id}', {})
        .then((res) => {
          Swal({
            text: "Xóa thành công",
            icon: "success",
            button: "OK",
          });
          this.componentDidMount();
        })
        Swal({
          text: "Xóa không thành công",
          icon: "success",
          button: "OK",
        });
    } else {
      Swal({
        text: "Xóa không thành công",
        icon: "success",
        button: "OK",
      });
    }
  }

  handleChange = (file) => {
    this.setState({ fileUpload: file[0] });
  };

  async submitEditProduct(e) {
    e.preventDefault();
    const id = $("#editID").val();
    const image =
      $("#editImage").val().split("\\")[2] !== "" &&
      $("#editImage").val().split("\\")[2] !== undefined
        ? $("#editImage").val().split("\\")[2]
        : $("#preview-image-before-edit").attr("src").split("/")[6];

    const fd = new FormData();
    fd.append("uploadImage", this.state.fileUpload);  // tải lên máy chủ

    if ($("#editImage").val().split("\\")[2]) {
      await axios
        .post('http://localhost:8000/api/upload-image', fd)
        .then((res) => {});
    }

    await axios
      .put('http://localhost:8000/api/edit-Tiki/${id}', {
        name: $("#editName").val(),
        description: $("#editDescription").val(),
        price: $("#editPrice").val(),
        image: image,
        rate: $("#editType").val(),
      })
      .then(() => {
        $("#editImage").val("");
        Swal({
          text: "Chỉnh sửa thành công",
          icon: "success",
          button: "OK",
        });
        $("#closeModalEditBtn").click();
        this.componentDidMount();
      });
  }

  async editProduct(id) {  // gọi khi người dùng muốn chỉnh sửa một sản phẩm cụ thể
    let product = this.state.products.find((product) => product.id === id); // lấy thông tin về sản phẩm từ một mảng products trong trạng thái (state) 
    $("#editID").val(product.id);
    $("#editName").val(product.name);
    $("#editDescription").val(product.description);
    $("#editPrice").val(product.price);
    $("#preview-image-before-edit").attr(
      "src",
      '{product.image}'
    );
    $("#editType").val(product.rate);
  }

  columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "Image",
      sortable: true,
      cell: (row) => (
        <img
          data-tag="allowRowEvents"
          src={row.image}
          alt="preview"
          style={{ width: "100px" }}
        />
      ),
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
      wrap: true,
      compact: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      wrap: true,
      compact: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      wrap: true,
      compact: true,
    },

    {
      name: "Rate",
      selector: "rate",
      sortable: true,
    },

    {
      name: "Action",
      selector: "id",
      cell: (row) => (
        <div>
          <button
            data-tag="allowRowEvents"
            className="btn btn-sm btn-warning"
            style={{ width: "80px" }}
            onClick={() => {
              this.editProduct(row.id);
            }}
            type="button"
            data-toggle="modal"
            data-target="#modelEditProduct"
          >
            Edit
          </button>
          <button
            data-tag="allowRowEvents"
            type="button"
            className="btn btn-sm btn-danger"
            style={{ width: "80px" }}
            onClick={() => this.deleteProduct(row.id)}
          >
            Delete
          </button>
        </div>
      ),
      compact: true,
    },
  ];

  render() {
    return (
      <div>
        {/* add product */}
        <div>
          <div
            className="modal fade"
            id="modelAddProduct"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal Add Product</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    id="closeModalAddBtn"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={this.onSubmitHandle}
                    encType="multipart/form-data"
                  >
                    <div className="form-group">
                      <label htmlFor="inputName">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="inputName"
                        id="inputName"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputPrice">Price</label>
                      <input
                        type="number"
                        min={10000}
                        className="form-control"
                        name="inputPrice"
                        id="inputPrice"
                        placeholder="Enter price"
                        required
                      />
                    </div>
           
                    <div className="form-group">
                      <label htmlFor="inputType">Rate</label>
                      <input
                        type="number"
                        min={1}
                        className="form-control"
                        name="inputType"
                        id="inputType"
                        placeholder="Enter type"
                        required
                      />
                    </div>
       
               
                    <div className="form-group">
                      <label htmlFor="inputImage">Image file</label>
                      <input
                        type="file"
                        className="form-control-file"
                        name="inputImage"
                        id="inputImage"
                        onChange={(e) => this.handleChange(e.target.files)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <img
                        id="preview-image-before-upload"
                        src="https://www.riobeauty.co.uk/images/product_image_not_found.gif"
                        alt="xem trước"
                        style={{ maxHeight: 250 }}
                      />
                      {this.previewImage()}
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputDescription">Description</label>
                      <input
                        type="text"
                        name="inputDescription"
                        className="form-control"
                        defaultValue={""}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* edit product */}
        <div>
          <div
            className="modal fade"
            id="modelEditProduct"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal Edit Product</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    id="closeModalEditBtn"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    onSubmit={this.submitEditProduct}
                    encType="multipart/form-data"
                  >
                    <div className="form-group">
                      <label htmlFor="editID">ID</label>
                      <input
                        type="number"
                        className="form-control"
                        name="editID"
                        id="editID"
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="editName">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="editName"
                        id="editName"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="editPrice">Price</label>
                      <input
                        type="number"
                        min={10000}
                        className="form-control"
                        name="editPrice"
                        id="editPrice"
                        placeholder="Enter price"
                        required
                      />
                    </div>
             
                    <div className="form-group">
                      <label htmlFor="inputType">Rate</label>
                      <input
                        type="number"
                        min={1}
                        className="form-control"
                        name="editType"
                        id="editType"
                        placeholder="Enter type"
                        required
                      />
                    </div>
              
               
                    <div className="form-group">
                      <label htmlFor="editImage">Image file</label>
                      <input
                        type="file"
                        className="form-control-file"
                        name="editImage"
                        id="editImage"
                        onChange={(e) => this.handleChange(e.target.files)}
                      />
                    </div>
                    <div className="form-group">
                      <img
                        id="preview-image-before-edit"
                        src="https://www.riobeauty.co.uk/images/product_image_not_found.gif"
                        alt="xem trước"
                        style={{ maxHeight: 250 }}
                      />
                      {this.previewEditImage()}
                    </div>
                    <div className="form-group">
                      <label htmlFor="editDescription">Description</label>
                      <input
                        type="text"
                        name="editDescription"
                        id="editDescription"
                        className="form-control"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* show product */}
        <div className="container">
          <button
            type="button"
            data-toggle="modal"
            data-target="#modelAddProduct"
            className="btn btn-primary"
            style={{ width: 80 }}
          >
            Add
          </button>
          <DataTable
            title="Show Products"
            columns={this.columns}
            data={this.state.products}
            paginationPerPage={5}
            defaultSortField="id"
            pagination
          />
        </div>
      </div>
    );
  }
}

export default Show_Tiki;
