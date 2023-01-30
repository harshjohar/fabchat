import { DefaultSeoProps } from 'next-seo';

const config: DefaultSeoProps = {
    title: 'FabChat | Your place to hangout',
    description: "This is fabchat,  place where you can connect to the world seamlessly!!",
    additionalMetaTags: [
        {
            name: 'keywords',
            content: 'fabchat, chatting, FabChat, NextJs, realtime, direct messages, channels, server'
        },
    ],
    additionalLinkTags: [
        {
            rel: "icon",
            href: "/favicon.ico",
        },
    ],
    
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: "https://fabchat.vercel.app/",
        siteName: 'FabChat',
        title: "FabChat | Your place to hangout",
        description: "This is fabchat,  place where you can connect to the world seamlessly!!Your place to hangout",
        images: [
            {
              url: 'https://res.cloudinary.com/dq9habeq2/image/upload/v1675108135/favicon_oiu0b4.ico',
              width: 850,
              height: 650,
              alt: 'FabChat Icon',
            },
          ],
    },
    // twitter: {
    //     handle: '@handle',
    //     site: '@site',
    //     cardType: 'summary_large_image',
    // },
};

export default config;