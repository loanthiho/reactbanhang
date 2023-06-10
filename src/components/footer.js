import React from 'react';
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6 col-xl-4 footer-click footer-1">
            <h4 className="title-menu">Về chúng tôi</h4>
            <img src="//theme.hstatic.net/200000610091/1000969627/14/logo-footer.png?v=429"width="300"height="64"/><br></br><br></br>
            <p className="content">Cosmetics Thành Luân chuyên phân phối mỹ phẩm chính hãng, uy tín, số lượng lớn với nhiều chương trình ưu đãi đặc biệt dành cho khách hàng.</p>
            <div className="single-contact">
              <i className="fa fa-map-marker-alt"></i>
              <div className="content"> Địa chỉ:
                <span className="content">101b ,Lê Hữu Trác , Phước Mỹ ,Sơn Trà, Đà Nẵng</span>
              </div>
            </div>
            <div className="single-contact">
              <i className="fa fa-mobile-alt"></i>
              <div className="content">Số điện thoại:0787628654</div>
            </div>
            <div className="single-contact">
              <i className="fa fa-envelope"></i>
              <div className="content">Email:letruongthanhluan15005@gmail.com
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-xl-2 footer-click">
            <h4 className="title-menu">Chính sách</h4>
            <div className="content">
                <p className="li_menu">Tìm kiếm</p>
                <p className="li_menu">Giới thiệu</p>
                <p className="li_menu"> Chính sách đổi trả</p>
                <p className="li_menu">Chính sách bảo mật</p>
                <p className="li_menu">Điều khoản dịch vụ </p>
                <p className="li_menu"> Liên hệ</p>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-xl-2 footer-click">
            <h4 className="title-menu">Kết nối với chúng tôi</h4>

            <div className="list-icon toggle-mn">
                  <img className='img1' src="//theme.hstatic.net/200000610091/1000969627/14/fot_c3_icon_1.png?v=429"/>
                  <img className='img1' src="//theme.hstatic.net/200000610091/1000969627/14/fot_c3_icon_2.png?v=429"/>
            </div>
          </div>
          <div className="col-xs-12 col-md-6 col-xl-4 footer-click">
            <h4 className="title-menu">Đăng ký nhận tin</h4>
            <div className="form_register ">
              <form action="/account/contact"className="contact-form" method="post" >
                <div className="custom-input-group mb-3 form_newsletter form_newsletter_customer">
                  <div className="input-group">
                        <input className="form-control input-group-field "placeholder="Nhập địa chỉ email"/>
                        <button className="h-100 btn text-white button_subscribe subscribe"type="submit">Đăng ký</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Footer;
