import Dialog from '@mui/material/Dialog';

export default function DialogModel({
    isOpen = false,
    children
}){
    return (
        <Dialog open={isOpen} PaperProps={{
            style : {
                "width" : "40%",
                "minHeight" : "30%",
                "maxHeight" : "60%"
            }
        }}>
            {children}
        </Dialog>
    )
}