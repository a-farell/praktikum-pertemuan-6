import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { COLORS } from '../../src/styles/tokens';

export default function SettingsScreen() {
  const [compactMode, setCompactMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>
      <View style={styles.row}>
        <Text style={{color: COLORS.text}}>Compact Mode</Text>
        <Switch value={compactMode} onValueChange={setCompactMode} />
      </View>
      <Text style={styles.info}>State: {compactMode ? 'Aktif' : 'Nonaktif'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 20, color: COLORS.text },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  info: { marginTop: 12, color: COLORS.muted },
});