import React from 'react'
import './ButtonStyle.css'

interface Props {
  text?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: "button" | "submit";
  form?: string;
  icon?: any;
}

const Button: React.FC<Props> = ({text, onClick, style, type, form, icon}) => {

  const onClickButton =(e: React.FormEvent)=> {
    e.preventDefault()
    if(onClick) onClick();
  }

  return (
    <div>
      <button onClick={onClickButton} style={style} type={type} form={form} className="btn">
      {text}
    </button>
    </div>
  )
}

export default Button
