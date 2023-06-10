import React from "react";

import axios from "axios";

class Admin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          product: [],
          id: null,
          name: "",
          avatar: "",
          quatity: "",
          description:""
        };
    }
    setStatus = () => {
        this.setState({ showAddForm: !this.state.showAddForm });
    }
    componentDidMount() {
        axios
            .get("https://63a5721a318b23efa793a770.mockapi.io/api/produce/")
            .then(response => {
                this.setState({ product: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    deleteBook = (id) => {
        axios
            .delete("https://63a5721a318b23efa793a770.mockapi.io/api/produce/" + id)
            .then(response => {
                console.log(response);
                const product = this.state.product.filter(item => item.id !== id);
                this.setState({ product });
            })
            .catch(error => {
                console.log(error);
            });
    }
    addBook = async () => {
        try {
          const Productlist = {
            name: this.state.name,
            avatar: this.state.avatar,
            quatity: this.state.quatity,
            description:this.state.description
          };
      
          const response = await axios.post(
            "https://63a5721a318b23efa793a770.mockapi.io/api/produce/",
            Productlist
          );
      
          console.log(response);
      
          const updatedProduct = [...this.state.product, response.data];
      
          this.setState({
            product: updatedProduct,
            name: '',
            avatar: '',
            quatity: '',
            description:''
          });
        } catch (error) {
          console.log(error);
        }
      };
      
      
      editBook = (id) => {
        const Productlist = this.state.product.find(item => item.id === id);
        this.setState({
          id: Productlist.id,
          name: Productlist.name,
          avatar: Productlist.avatar,
          quatity: Productlist.quatity,
          description:Productlist.description,
          showEditForm: true
        });
      }
      formAddBook = () => {
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label>Tên Sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Ảnh sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.avatar} onChange={(e) => this.setState({ avatar: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Gía</label>
                      <input type="text" className="form-control" value={this.state.quatity} onChange={(e) => this.setState({ quatity: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Mô tả</label>
                      <input type="text" className="form-control" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.addBook}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    formEditBook = () => {
        if (!this.state.showEditForm) {
          return null; // Không hiển thị form khi showEditForm = false
        }
      
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label>ID</label>
                      <input type="text" className="form-control" value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Tên sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Ảnh sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.avatar} onChange={(e) => this.setState({ avatar: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Gía </label>
                      <input type="text" className="form-control" value={this.state.quatity} onChange={(e) => this.setState({ quatity: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Mô tả sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.updateBook}>Sửa</button>
                    <button type="button" className="btn btn-primary" onClick={() => this.setState({ showEditForm: false })}>Hủy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      updateBook = () => {
        const Productlist = {
          id: this.state.id, // Sử dụng this.state.id thay vì this.id
          name: this.state.name,
          avatar: this.state.avatar,
          quatity: this.state.quatity,
          description:this.state.description
        };
      
        axios
          .put("https://63a5721a318b23efa793a770.mockapi.io/api/produce/" + this.state.id, Productlist)
          .then(response => {
            console.log(response);
            const updatedProduct = this.state.product.map(item => {
              if (item.id === this.state.id) {
                return Productlist;
              }
              return item;
            });
            this.setState({ product: updatedProduct, showEditForm: false }); // Cập nhật showEditForm thành false sau khi chỉnh sửa thành công
          })
          .catch(error => {
            console.log(error);
          });
      }
    render() {
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 class="Title_table">Quản lý sản phẩm</h4>
                                    <p className="card-text">
                                    <button className="btn btn-primary" onClick={this.setStatus}>Thêm sản phẩm mới</button>
                                        {/* <button class="AddBtn" onClick={this.setStatus}>Add Book</button> */}
                                    </p>
                                    {this.state.showAddForm ? this.formAddBook() : null}

                                    <table className="table table-bordered">
                                        <thead>

                                            <tr>
                                                <th>ID</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Ảnh sản phẩm</th>
                                                <th>Gía</th>
                                                <th>Mô tả sản phẩm</th>
                                                <th>Xóa</th>
                                                <th>Sửa</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.product.map((products) =>(
                                                <tr >
                                                    <td><textbox type="text" name="id" onChange={this.handleChange} /> {products.id}</td>
                                                    <td>{products.name}</td>
                                                    <td><img className="img2" src={products.avatar} alt={products.name} /></td>
                                                    <td>{products.quatity}</td>
                                                    <td>{products.description}</td>
                                                    <td><button className="btn btn-primary" onClick={() => this.deleteBook(products.id)}>Delete</button></td>
                                                    <td><button className="btn btn-primary" onClick={() => this.editBook(products.id)}>Edit</button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showEditForm ? this.formEditBook() : null}
             </div>
        );
     }
 }
export default Admin;
