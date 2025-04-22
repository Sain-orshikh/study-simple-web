"use client"

import { FaBold, FaItalic, FaStrikethrough  } from "react-icons/fa6";
import { MdFormatListBulleted, MdFormatUnderlined, MdOutlineImage } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import { RiMenu2Fill, RiMenu3Fill, RiMenu5Fill } from "react-icons/ri";
import { TbBallpenOff, TbLink, TbLinkOff } from "react-icons/tb";
import Upload from "../../../assets/upload.png";
import toast, { Toaster } from "react-hot-toast";
import { MdPreview } from "react-icons/md";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ImageResize from "tiptap-extension-resize-image";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import Gapcursor from "@tiptap/extension-gapcursor";
import TextStyle from "@tiptap/extension-text-style";
import { HexColorPicker } from "react-colorful";
import Preview from "@/components/ui/Preview";
import { Modal } from "@mui/material";

const fonts = [
  { label: "Inter", value: "Inter" },
  { label: "Comic Sans", value: '"Comic Sans MS", "Comic Sans"' },
  { label: "Serif", value: "serif" },
  { label: "Monospace", value: "monospace" },
  { label: "Cursive", value: "cursive" },
  { label: "CSS Variable", value: "var(--title-font-family)" },
  { label: "Exo 2", value: '"Exo 2"' },
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Verdana", value: "Verdana" },
  { label: "Tahoma", value: "Tahoma" },
  { label: "Trebuchet MS", value: "Trebuchet MS" },
  { label: "Geneva", value: "Geneva" },
  { label: "Times New Roman", value: '"Times New Roman", Times, serif' },
  { label: "Georgia", value: "Georgia" },
  { label: "Garamond", value: "Garamond" },
  { label: "Palatino", value: "Palatino" },
  { label: "Bookman", value: "Bookman" },
  { label: "Courier New", value: '"Courier New", Courier, monospace' },
  { label: "Lucida Console", value: "Lucida Console, Monaco, monospace" },
  { label: "Monaco", value: "Monaco" },
  { label: "Consolas", value: "Consolas" },
  { label: "Brush Script", value: '"Brush Script MT", cursive' },
  { label: "Impact", value: "Impact, fantasy" },
];

const categories = [
    "Others",
    "Study Tips",
    "Productivity",
    "Study Skills",
    "Mental Health",
    "Technology",
  ]

const Editor = () => {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Gapcursor,
      
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            const disallowedDomains = ['https://www.4chan.org']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            const disallowedDomains = ['https://www.4chan.org']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },

      }),
      Document,
      Text,
      Paragraph,
      BulletList,
      OrderedList,
      ListItem,
      TextStyle,
      Underline,
      FontFamily,
      Highlight.configure({multicolor: true}),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ImageResize,
    ],
    content: "<p></p>",
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Others');
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the first file from the input
    if (file) {
      setImage(file); // Store the file in the state
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set the preview to the uploaded image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = editor?.getHTML() || ""; // Get the HTML content from the editor
    console.log("Image:", image);
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Category:", category);
    if (!image || !title || !content || !category) {
      toast.error("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image); // Append the file to FormData
    formData.append('title', title); // Append the title
    formData.append('content', content); // Append the content
    formData.append('category', category); // Append the category

    try {
      const response = await fetch('http://localhost:5000/api/blogs/create', {
        method: 'POST',
        body: formData, // Send the FormData as the request body
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Blog uploaded successfully!');
      } else {
        console.error('Error uploading blog:', data.error);
      }
    } catch (error) {
      console.error('Error uploading blog:', error);
      toast.error("Error uploading blog. Don't insert pictures larger than 1mb in content.");
    }
  };

  const [highlightColor, setHighlightColor] = React.useState("#ff0000");
  const [showPicker, setShowPicker] = React.useState(false);


  const setLink = () => {
    const previousUrl = editor?.getAttributes("link").href; 
    const url = window.prompt("Enter the URL", previousUrl || "https://");
  
    if (url === null || url.trim() === "") return;
  
    const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
  
    editor?.chain().focus().extendMarkRange("link").setLink({ href: validUrl }).run();
  };
  
  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = event.target.value;
    if (selectedFont) {
      editor?.chain().focus().setFontFamily(selectedFont).run();
    }
  };

  if (!editor) {
    return null;
  }

  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      editor?.chain().focus().setImage({ src: base64 }).run();
    };
    reader.readAsDataURL(file);
  };

  const jsonContent = editor.getJSON();

  const handlePreview = () => {
    setPreviewOpen(true);
    toast.success("Preview opened!");
  };

  return (
    <div className="border py-4 w-full">
      <Toaster/>
      <div className="w-[80%] mx-auto my-2 font-bold text-2xl text-start">
        Content
      </div>
      <div className={`fixed top-0 ml-auto mt-14 border-t border-b border-r z-10 mb-2 flex items-center justify-evenly w-[100%] bg-gray-100 py-1 px-2`}>
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level) {
              editor.chain().focus().toggleHeading({ level: level as any }).run();
            }
          }}
          defaultValue=""
          className="hover:bg-white bg-inherit focus:outline-none rounded"
        >
          <option value="">Normal Text</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>
        <div className="px-2 border-r border-l">
          <link
            href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
          <div className="control-group">
            <select onChange={handleFontChange} defaultValue="" className="hover:bg-white bg-inherit rounded focus:outline-none">
              <option value="" disabled>Select Font</option>
              {fonts.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <FaBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FaItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <FaStrikethrough />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="border-r pr-2">
          <MdFormatUnderlined fontSize={20}/>
        </button>
        <div style={{ position: "relative", display: "inline-block" }}>
          <button
            style={{
              backgroundColor: highlightColor,
              width: "20px", 
              height: "20px", 
              borderRadius: "50%", 
              border: "2px solid #ccc", 
              cursor: "pointer",
              marginTop: "2px",
            }}
            onClick={() => {
              setShowPicker(!showPicker); 
              editor.chain().focus().toggleHighlight({ color: highlightColor }).run()
            }}
            className={editor.isActive('highlight', { color: highlightColor }) ? 'is-active' : ''}
          >
          </button>
          {showPicker && (
            <div
              style={{
                position: "absolute",
                top: "100%", 
                left: "50%",
                transform: "translateX(-50%)", 
                zIndex: 1000, 
                marginTop: "8px", 
                background: "#fff",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <HexColorPicker color={highlightColor} onChange={setHighlightColor} />
            </div>
          )}
      </div>
      <button
        onClick={() => editor.chain().focus().unsetHighlight().run()}
        disabled={!editor.isActive('highlight')}
        className=""
      >
        <TbBallpenOff fontSize={20}/>
      </button>
      <label className="cursor-pointer">
          <MdOutlineImage fontSize={20}/>
          <input type="file" accept="image/*" onChange={addImage} className="hidden" />
        </label>
        <button onClick={setLink} className={editor.isActive("link") ? "is-active" : ""}>
          <TbLink fontSize={20}/>
        </button>
        <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive("link")} className="border-r pr-2">
          <TbLinkOff fontSize={20}/>
        </button>
        <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <RiMenu2Fill fontSize={20}/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <RiMenu5Fill fontSize={20}/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <RiMenu3Fill fontSize={20}/>
          </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <MdFormatListBulleted fontSize={20}/>
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <AiOutlineOrderedList fontSize={20}/>
        </button>
      </div>
      <div className="w-[80%] mx-auto border focus-within:border-none">
        <EditorContent editor={editor} />
      </div>
      <div className="w-[80%] mx-auto mt-3 font-bold text-2xl text-start">
        Title
      </div>
      <div className="w-[80%] mx-auto mt-3 flex flex-row">
        <input
          value={title}
          onChange={handleInputChange}
          placeholder="Enter title here..."
          className="border w-[80%] h-10 px-2"
        />
        <div className="w-[20%] border flex justify-center items-center">
            <select 
                className="category w-[75%]"
                value={category}
                onChange={handleCategoryChange}
            >
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
      </div>
      <div className="w-[80%] mx-auto mt-3 font-bold text-2xl text-start">
        Cover Image
      </div>
      <label
        className="flex flex-row justify-center items-center w-[80%] h-[8rem] mx-auto mt-3 border cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <img
          src={imagePreview || Upload.src} // Use the uploaded image preview or fallback to the default image
          alt="Preview"
          className="w-[8rem] h-[8rem]" // Ensure the image covers the container
        />
      </label>
      <div className="w-[80%] mx-auto mt-3 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 w-[90%] hover:bg-blue-700 cursor-pointer text-black py-2 rounded"
        >
          Submit
        </button>
        <button onClick={handlePreview} className="w-[10%] flex justify-center items-center bg-white text-black border hover:bg-gray-200 cursor-pointer py-2 rounded ml-2">
          <MdPreview fontSize={25}/>
        </button>
      </div>
        <Modal
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          className="flex items-center justify-center w-[90%] h-[90%] mx-auto my-auto"
        >
          <Preview blog={{ image: (imagePreview as string) || null, title, content: editor.getHTML(), category }} />
        </Modal>
    </div>
  );
};

export default Editor;