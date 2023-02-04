import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rangeParser from 'parse-numeric-range'
import 'katex/dist/katex.min.css'
import {SyntaxHighlighter} from "./SyntaxHighlighter";
import materialDark from "react-syntax-highlighter/dist/cjs/styles/prism/material-dark";

export const MarkdownText = ({children, className = ""}: {children: string, className: string}) => {

    const components = {
        // @ts-ignore
        code({ node, inline, className, ...props }) {

            const match = /language-(\w+)/.exec(className || '')
            const hasMeta = node?.data?.meta

            const applyHighlights = (applyHighlights: number) => {
                if (hasMeta) {
                    const RE = /{([\d,-]+)}/
                    const metadata = node.data.meta?.replace(/\s/g, '')
                    // @ts-ignore
                    const strlineNumbers = RE?.test(metadata) ? RE?.exec(metadata)[1] : '0'
                    const highlightLines = rangeParser(strlineNumbers)
                    const data = highlightLines.includes(applyHighlights)
                        ? 'highlight'
                        : null
                    return { data }
                } else {
                    return {}
                }
            }

            return match ? (
                <SyntaxHighlighter
                    style={materialDark}
                    language={match[1]}
                    PreTag="div"
                    className="codeStyle"
                    showLineNumbers={true}
                    wrapLines={!!hasMeta}
                    useInlineStyles={true}
                    lineProps={applyHighlights}
                    {...props}
                />
            ) : (
                <code className={className} {...props} />
            )
        }
    }

    return (
        <ReactMarkdown
            className={className}
            remarkPlugins={[[remarkGfm, {singleTilde: false}], remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            // @ts-ignore
            components={components}
        >
            {children}
        </ReactMarkdown>
    )
}