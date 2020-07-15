const webpack=require("webpack");
const path=require("path");
const config={
    entry:[
        "./src/index.tsx"
    ],
    output:{
        filename:"bundle.js",
        path: path.resolve(__dirname,"dist")
    },
    module:{
        rules:[
            {
                test:/\.(ts|tsx)$/,
                use:"ts-loader",
                exclude:/node_module/
                
            }
        ,
            {
                test:/\.scss$/,
                loaders:[
                    "style-loader",
                    "css-loader",
                    "sass-loader",

                    
                ]
            },
            { test: /\.(png|jpg|jpeg|svg)$/, 
            use:"file-loader" }
            
        ]

    },
    resolve:{
        extensions:[
            ".ts",
            ".tsx",
            ".js",
            ".scss"

        ]
    },
    devServer:{
        contentBase:"./dist",
        historyApiFallback:true,
        port:8001
    },
    devtool:"source-map"
};

module.exports=config;