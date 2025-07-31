module.exports = (BASE_URL) => (req, res, next) => {
  res.locals.meta = {
    title: 'UiGenKit – All-in-One Trending UI Generator Kit Generate UI Fast and Beautifully',
    description: 'UiGenKit is a multi-featured UI tool for designers and developers. Generate backgrounds, gradients, color palettes, and Soft UI designs easily.',
    keywords: 'UiGenKit, UI tools, color palette,linear gradient generator,background image pattern generator',
    canonical: `${BASE_URL}${req.originalUrl}`,
    url: `${BASE_URL}${req.originalUrl}`,
    robots: 'index, follow',
    ogImage: `${BASE_URL}/images/uigenkit-og.png`
  };
  next();
};
