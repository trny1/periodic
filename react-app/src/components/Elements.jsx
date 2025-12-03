export default function Element({ element, colors }) {
  return (
    <div style={{
      gridRow: element?.data?.period,
      gridColumn: element?.data?.group,
      border: '1px solid black',
      width: '4vw',
      height: '4vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:
        Object.keys(colors).includes(element?.data?.category)
          ?
          colors[element?.data?.category]
          :
          element?.data?.category.includes('unknown')
            ?
            colors['unknown']
            :
            colors['default'],
      color: 'black',
    }
    }>
      <h2>{element?.data?.symbol}</h2>
    </div>
  )
}