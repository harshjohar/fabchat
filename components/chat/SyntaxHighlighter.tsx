import React from "react";
import {PrismLight} from "react-syntax-highlighter";

import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript'
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss'
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash'
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown'
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json'
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp";
import kotlin from "react-syntax-highlighter/dist/cjs/languages/prism/kotlin";
import csharp from "react-syntax-highlighter/dist/cjs/languages/prism/csharp";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import dart from "react-syntax-highlighter/dist/cjs/languages/prism/dart";
import latex from "react-syntax-highlighter/dist/cjs/languages/prism/latex";
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql";
import powershell from "react-syntax-highlighter/dist/cjs/languages/prism/powershell";
import swift from "react-syntax-highlighter/dist/cjs/languages/prism/swift";

PrismLight.registerLanguage('tsx', tsx)
PrismLight.registerLanguage('typescript', typescript)
PrismLight.registerLanguage('scss', scss)
PrismLight.registerLanguage('bash', bash)
PrismLight.registerLanguage('markdown', markdown)
PrismLight.registerLanguage('json', json)
PrismLight.registerLanguage('java',java)
PrismLight.registerLanguage('cpp',cpp)
PrismLight.registerLanguage('kotlin',kotlin)
PrismLight.registerLanguage('csharp',csharp)
PrismLight.registerLanguage('python',python)
PrismLight.registerLanguage('dart',dart)
PrismLight.registerLanguage('latex',latex)
PrismLight.registerLanguage('sql',sql)
PrismLight.registerLanguage('powershell',powershell)
PrismLight.registerLanguage('swift',swift)

export const SyntaxHighlighter = ({...props}) => {
    return (
        // @ts-ignore
        <PrismLight {...props}/>
    )
}