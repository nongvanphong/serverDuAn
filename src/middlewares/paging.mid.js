exports.paging = (req, res, next) => {
  let { page, perpage } = req.query;
  if (page) {
    if (isNaN(page) == true) {
      page = 1;
    } else {
      if (page < 1) {
        page = 1;
      } else {
        page = page;
      }
    }
  } else {
    page = 1;
  }
  if (perpage) {
    if (isNaN(perpage) == true) {
      perpage = 10;
    } else {
      if (perpage < 1) {
        perpage = 10;
      } else {
        perpage = perpage;
      }
    }
  } else {
    perpage = 10;
  }

  req.paging = {
    offset: (parseInt(page) - 1) * parseInt(perpage),
    limit: parseInt(perpage),
  };
  next();
};
