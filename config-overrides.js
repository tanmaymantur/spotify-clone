module.exports = function override(config, env) {
  const babelLoader = config.module.rules
    .find((rule) => rule.oneOf instanceof Array)
    .oneOf.find(
      (loader) => loader.loader && loader.loader.includes("babel-loader")
    );

  if (babelLoader) {
    babelLoader.options.plugins = [
      ...(babelLoader.options.plugins || []),
      [
        "@babel/plugin-transform-react-jsx",
        {
          throwIfNamespace: false,
        },
      ],
    ];
  }

  return config;
};
