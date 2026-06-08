const formatName = (name) => {
     return name
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export default formatName
