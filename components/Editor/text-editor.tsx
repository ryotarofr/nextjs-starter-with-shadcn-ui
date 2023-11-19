'use client';

import { SyntheticEvent, useEffect, useState } from "react";

/* Lexical Design System */
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { TRANSFORMERS } from "@lexical/markdown";
import ExampleTheme from "./themes/ExampleTheme"

/* Lexical Plugins Local */
import ToolbarPlugin from "./plugins/ToolbarPlugin"
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin"
import AutoLinkPlugin from "./plugins/AutoLinkPlugin"
import ExportPluginJson from "./plugins/ExportPluginJson"
import EmojiPickerPlugin from "./plugins/EmojiPickerPlugin"
import ComponentPickerMenuPlugin from "./plugins/ComponentPickerPlugin"

/* Lexical Plugins Remote */
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";

/* Lexical Others */
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';


/* Lexical Nodes */
import { $getRoot, $getSelection } from "lexical";

/* other package, components */
// import axios from "axios";
import { Toaster } from "react-hot-toast";
// import { useNaiseiIdStore } from "@/app/hooks/useNaiseiIdStore";
// import useGetAllNaisei from "@/app/hooks/useGetNaiseiAll";
// import { useToggleEditor } from "@/app/hooks/useToggleEditor";
// import { GenarateNaisei } from "../GenarateNaisei";


function Placeholder() {
    return <div className="editor-placeholder">Enter some rich text...</div>;
}

const EvaluationType = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
}

export function Editor() {

    // const selectedId = useNaiseiIdStore((state) => state.selectedId)

    const [evaluationType, setEvaluationType] = useState(EvaluationType.A);
    const [naisei, setNaisei] = useState('')
    // const { data, loading, fetch }: any = useGetAllNaisei()
    // const { onClose } = useToggleEditor()
    const [generateData, setGenarateData] = useState("{}")
    const [emotion, setEmotion] = useState('')


    // ------------------------
    // AIにデータ渡す
    // JSONとして解析
    const parsedData = JSON.parse(generateData);
    // 必要なデータを抽出
    const textObjects: any = [];

    function extractText(obj: any) {
        // objがnullや空のオブジェクトならreturnする
        if (!obj || Object.keys(obj).length === 0) return;
        if (obj.type === 'text') {
            textObjects.push(obj.text);
        } else if (obj.children && obj.children.length > 0) {
            obj.children.forEach((child: any) => extractText(child));
        }
    }
    // parsedData.rootがundefinedでないことを確認する
    if (parsedData.root) {
        extractText(parsedData.root);
    }
    const textData = textObjects.join(',')
    // --------------------------------------------------

    // useEffect(() => {
    //     setNaisei("")
    //     setEmotion('')
    //     if (selectedId !== null) {
    //         // data配列から選択されたIDに一致する要素を探す
    //         const selectedData = data.find((item: any) => item.id === selectedId);
    //         if (selectedData) {
    //             setNaisei(selectedData.naisei);
    //             setEmotion(selectedData.emotion)

    //         } else {
    //             setNaisei(""); // データが見つからない場合は空に設定
    //         }
    //     } else {
    //         setNaisei(""); // selectedNaiseiIdがnullの場合も空に設定
    //     }
    // }, [selectedId, data])

    const exportAsJson = (contenAsJson: string) => {
        setNaisei(contenAsJson)
        setGenarateData(contenAsJson)
        return contenAsJson
    };
    function onChange(editorState: any) {
        editorState.read(() => {
            const root = $getRoot();
            const selection = $getSelection();
            const tomato = root.__cachedText


        });
    }

    // const handleUpdate = async (e: SyntheticEvent) => {
    //     e.preventDefault();
    //     onClose()
    //     setNaisei("")
    //     const apiUrl = `/api/naisei/${selectedId}`;
    //     const updatedData = {
    //         // リクエストボディに送信するデータ
    //         naisei: naisei,
    //         evaluation_type: evaluationType,
    //     };
    //     axios.put(apiUrl, updatedData)
    //         .then(response => {
    //             // toast.success('Updated Naisei!!!!', { duration: 5000 })
    //             // fetchIsNaisei()
    //             fetch()
    //             return response
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }

    // const handleDelete = async (e: SyntheticEvent) => {
    //     e.preventDefault();
    //     onClose()
    //     // setNaisei("")
    //     const apiUrl = `/api/naisei/${selectedId}`;
    //     axios.delete(apiUrl)
    //         .then(response => {
    //             // toast.success('Updated Naisei!!!!', { duration: 5000 })
    //             // fetchIsNaisei()
    //             fetch()
    //             return
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }

    // template機能->naiseiのStateをテンプレートの値に更新させる
    // toggleボタン用意してtemp1,2,3...って押したら事前に用意したPrismaのデータをNaiseiのStateに挿入
    const testinit = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Welcome to the playground","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
    const editorConfig = {
        // The editor theme
        theme: ExampleTheme,
        namespace: "daily-standup-editor",
        // editorState: textDailyStandup,
        editorState: testinit,
        // Handling of errors during update
        onError(error: unknown) {
            throw error;
        },
        // Any custom nodes go here
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode
        ],
    };

    // if (!naisei) return <></>

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <ToolbarPlugin />
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <OnChangePlugin onChange={onChange} />
                    <ListPlugin />
                    <HistoryPlugin />
                    <AutoFocusPlugin />
                    <CodeHighlightPlugin />
                    <LinkPlugin />
                    <TabIndentationPlugin />
                    <AutoLinkPlugin />

                    <ExportPluginJson exportAsJSON={exportAsJson} />
                    <EmojiPickerPlugin />
                    <ComponentPickerMenuPlugin />

                    <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

                    <div className="flex justify-end">
                        <button className='mx-4 mb-2 mt-2 text-md cursor-pointer rounded-lg border-none px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white'
                        // onClick={handleUpdate}
                        >Update</button>
                        <button className='mx-4 mb-2 mt-2 text-md cursor-pointer rounded-lg border-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white'
                        // onClick={handleDelete}
                        >Delete</button>
                        {/* <GenarateNaisei textData={textData} isPro={isPro} emotion={emotion} /> */}
                    </div>
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                    />
                    {/* <TreeViewPlugin /> */}
                </div>
            </div>
        </LexicalComposer>
    );
}
