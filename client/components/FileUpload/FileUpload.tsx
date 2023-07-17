import React, { useRef } from 'react'
import styles from '../../styles/FileUpload/FileUpload.module.scss'

type FileUploadProps = {
  setFile: Function;
  setSrcPicture?: (v: string) => void
  accept: string;
  children?: JSX.Element
}

export const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children, setSrcPicture}) => {
  const ref = useRef<HTMLInputElement>(null)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      var file = e.target.files[0]
      if(setSrcPicture) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          if(typeof reader.result === 'string') {
            setSrcPicture(reader.result)
          }
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        }
      }
      setFile(e.target.files[0])
    }
  }
  return (
    <div onClick={() => ref.current?.click()}>
      <input
        type='file'
        className={styles.input}
        accept={accept}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  )
}
